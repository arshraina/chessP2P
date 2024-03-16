import Chessground from "@react-chess/chessground";

import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

export default function Game() {
  return (
    <div className="p-10">
      <Chessground
        width={400}
        height={400}
        fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
        orientation="white"
      />
    </div>
  );
}
