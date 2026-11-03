import SuggestedList from "../feed/SuggestedList";
import TrendingList from "../feed/TrendingList";
import MusicPlayer from "../feed/MusicPlayer";

export default function RightRail() {
  return (
    <aside className="rail space-y-4 px-4 py-4">
      <SuggestedList />
      <TrendingList />
      <MusicPlayer />
    </aside>
  );
}
