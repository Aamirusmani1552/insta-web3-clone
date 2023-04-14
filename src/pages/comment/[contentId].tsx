import { useRouter } from "next/router";
import React, { FC, ReactElement } from "react";

type Props = {};

const Comment: FC<Props> = (props): ReactElement => {
  const router = useRouter();
  const { contentId } = router.query;

  console.log(contentId);

  return <div>Comment</div>;
};

export default Comment;
