import React, { memo } from "react";

type Props = {
  apiError?: string;
  formError?: string;
};

function FieldError({ apiError, formError }: Props): JSX.Element | null {
  if (apiError) return <div>{apiError.toLowerCase()}</div>;
  if (formError) return <div>{formError}</div>;
  return null;
}

const MemoComponent = memo(FieldError);

export default MemoComponent;
