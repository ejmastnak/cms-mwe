import { useTina, tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Heading from "@tina/components/Heading.tsx";
import type { AboutPageQuery, AboutPageQueryVariables } from "@tina/__generated__/types";

type Props = {
  variables: AboutPageQueryVariables;
  data: AboutPageQuery;
  query: string;
};

export default function AboutPage(props: Props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  const aboutPage = data.aboutPage;

  return (
    <div>
      <Heading tinaDocument={aboutPage} />

      <p className="mt-5" data-tina-field={tinaField(aboutPage, "subtitle")}>{aboutPage.subtitle}</p>

      <div className="prose mt-5" data-tina-field={tinaField(aboutPage, "body")}>
        <TinaMarkdown content={aboutPage.body} />
      </div>

    </div>
  );
}
