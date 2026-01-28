import GameBoard from "./GameBoard";
import PigCharacter from "./PigCharacter";

const PigIndex = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <PigCharacter size={56} />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              길찾기 놀이
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            화살표를 따라 돼지가 어디로 가는지 맞춰보세요!
          </p>
        </header>

        {/* Game */}
        <main>
          <GameBoard />
        </main>

        {/* Footer */}
        <footer className="text-center mt-12 text-muted-foreground text-sm">
          <p>🧠 인지 훈련 게임</p>
        </footer>
      </div>
    </div>
  );
};

export default PigIndex;
