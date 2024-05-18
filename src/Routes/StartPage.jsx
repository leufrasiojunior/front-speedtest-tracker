import DownloadChats from "../Components/DownloadChats";
import Avarages from "../Components/Avarages";

function StartPage() {
  document.title = "Home - Dashboard SpeedTest Tracker";

  return (
    <>
      <Avarages />
      <DownloadChats />
    </>
  );
}

export default StartPage;
