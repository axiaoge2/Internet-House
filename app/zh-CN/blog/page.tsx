export default function ChineseBlogPage() {
  return (
    <div className="container mx-auto px-4 py-12 cozy-bg-pattern">
      <h1 className="text-4xl font-bold mb-8 text-foreground">碎碎念</h1>
      <p className="text-lg text-foreground/60 mb-8">我的思考和故事</p>

      <div className="text-center py-16 bg-card rounded-2xl border border-border">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-foreground/60 text-lg">
          还没有碎碎念...
        </p>
        <p className="text-foreground/40 mt-2">
          很快就会有内容了 ✨
        </p>
      </div>
    </div>
  );
}