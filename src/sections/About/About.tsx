import Card from "../../components/ui/Card/Card";
import Markdown from "../../components/ui/Markdown/Markdown";

const content = `
Hi there, I'm Clarence.

I'm a full-stack Software Engineer (Monash BSE 2020).

Born and raised in Penang, and based in Melbourne since 2014.

I love reading about ancient civilisations, watching and reading about sci-fi, rock, and graphic design.
`;

export default function About() {
  return (
    <Card>
      <Markdown>
        {content}
      </Markdown>
    </Card>
  );
}
