
import InlineStyle from "../components/inlineStyle";
import CssFile from "../components/cssFile";
import CssModule from "../components/cssModule";
import CssLibrary from "../components/cssLibrary";

function MainPage() {

  return (
    <div>
      <h1>InlineStyle example</h1>
      <InlineStyle/>
      <h1>CssFile example</h1>
      <CssFile/>
      <h1>CssModule example</h1>
      <CssModule/>
      <h1>CssLibrary example</h1>
      <CssLibrary/>
    </div>
  );
}

export default MainPage;
