import rawCv from "./software-cv.html?raw";
import { CvActions } from "./cv-actions";

const embeddedStyle = rawCv.match(/<style>([\s\S]*?)<\/style>/i)?.[1] ?? "";
const embeddedBody = rawCv
  .match(/<body>([\s\S]*?)<\/body>/i)?.[1]
  ?.replace(
    /<a href="(https?:\/\/[^\"]+)"/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer"',
  ) ?? "";

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: embeddedStyle }} />
      <CvActions />
      <div dangerouslySetInnerHTML={{ __html: embeddedBody }} />
    </>
  );
}
