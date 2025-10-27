import { useTina, tinaField } from "tinacms/dist/react";

import { TinaMarkdown } from "tinacms/dist/rich-text";
import Heading from "@tina/components/Heading.tsx";
import type { HomePageQuery, HomePageQueryVariables } from "@tina/__generated__/types";

type Props = {
  variables: HomePageQueryVariables;
  data: HomePageQuery;
  query: string;
};

export default function HomePage(props: Props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  const homePage = data.homePage;

  return (
    <div>
      <Heading tinaDocument={homePage} />

      <p data-tina-field={tinaField(homePage, "subtitle")}>{homePage.subtitle}</p>

      <div data-tina-field={tinaField(homePage, "body")} className="prose mt-5">
        <TinaMarkdown content={homePage.body} />
      </div>
    </div>
  );
}
