'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

interface IntersectionOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver(
  options: IntersectionOptions = {}
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;

    if (entry.isIntersecting) {
      setIsIntersecting(true);
      setHasIntersected(true);
    } else if (!triggerOnce) {
      setIsIntersecting(false);
    }
  }, [triggerOnce]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // 检查浏览器是否支持 Intersection Observer
    if (!window.IntersectionObserver) {
      // 降级处理：直接显示元素
      setIsIntersecting(true);
      setHasIntersected(true);
      return;
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [threshold, rootMargin, handleIntersection]);

  return [ref, isIntersecting || (triggerOnce && hasIntersected)];
}

// 用于多个元素的 Hook
export function useIntersectionObserverList(
  count: number,
  options: IntersectionOptions = {}
): [React.RefCallback<HTMLDivElement>, boolean[]] {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const [visibleElements, setVisibleElements] = useState<boolean[]>(new Array(count).fill(false));
  const [hasIntersected, setHasIntersected] = useState<Set<number>>(new Set());
  const elementsRef = useRef<(HTMLDivElement | null)[]>(new Array(count).fill(null));

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);

      if (entry.isIntersecting && !isNaN(index)) {
        setVisibleElements(prev => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });

        if (triggerOnce) {
          setHasIntersected(prev => new Set([...prev, index]));
        }
      } else if (!triggerOnce && !isNaN(index)) {
        setVisibleElements(prev => {
          const updated = [...prev];
          updated[index] = false;
          return updated;
        });
      }
    });
  }, [triggerOnce]);

  useEffect(() => {
    const elements = elementsRef.current.filter(el => el !== null) as HTMLElement[];

    if (elements.length === 0) return;

    // 检查浏览器是否支持 Intersection Observer
    if (!window.IntersectionObserver) {
      // 降级处理：直接显示所有元素
      setVisibleElements(new Array(count).fill(true));
      return;
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    elements.forEach((element, index) => {
      if (element) {
        element.setAttribute('data-index', index.toString());
        observer.observe(element);
      }
    });

    return () => {
      elements.forEach(element => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [count, threshold, rootMargin, handleIntersection]);

  const setElementRef: React.RefCallback<HTMLDivElement> = useCallback((element) => {
    if (element && element.getAttribute('data-index')) {
      const index = parseInt(element.getAttribute('data-index') || '0', 10);
      elementsRef.current[index] = element;
    }
  }, []);

  return [setElementRef, visibleElements];
}

// 带有延迟的 Hook，用于创建渐进式效果
export function useStaggeredIntersection(
  count: number,
  baseDelay: number = 100,
  options: IntersectionOptions = {}
): [React.RefCallback<HTMLDivElement>, boolean[]] {
  const [visibleElements, setVisibleElements] = useState<boolean[]>(new Array(count).fill(false));
  const [setElementRef, rawVisibleElements] = useIntersectionObserverList(count, options);

  useEffect(() => {
    rawVisibleElements.forEach((isVisible, index) => {
      if (isVisible && !visibleElements[index]) {
        // 为每个元素添加延迟效果
        const timer = setTimeout(() => {
          setVisibleElements(prev => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
          });
        }, index * baseDelay);

        return () => clearTimeout(timer);
      }
    });
  }, [rawVisibleElements, baseDelay, visibleElements, count]);

  return [setElementRef, visibleElements];
}