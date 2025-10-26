import { tinaField } from "tinacms/dist/react";
import type { Document } from "@tina/__generated__/types";

type Props = {
  tinaDocument: Document & {
    h1: string;
  };
};

export default function Heading({tinaDocument}: Props) {
  return (
    <h1 className="text-3xl" data-tina-field={tinaField(tinaDocument, "h1")}>{tinaDocument.h1}</h1>
  );
}
