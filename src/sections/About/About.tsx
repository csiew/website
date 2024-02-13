import Card from "../../components/ui/Card/Card";
import Markdown from "../../components/ui/Markdown/Markdown";

const content = `
Full-stack Software Engineer. Monash BSE 2020.

Born and raised in Penang. Based in Melbourne.

Lover of ancient civilisations, rock, and graphic design.
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
