import { ReactNode } from 'react';
import cn from 'classnames';

import './styles.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  createdAt: string;
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

export function Question({
  content,
  author,
  createdAt,
  children,
  isAnswered = false,
  isHighlighted = false,
}: QuestionProps) { //props: - get all info |  { field1, field2 } - get only what you need
  return (
    // <div className={`question ${isAnswered ? 'answered' : ''} 
    //   ${isHighlighted ? 'highlighted' : ''}`}
    // >
    <div className={cn(
      'question',
      {answered: isAnswered},
      {highlighted: isHighlighted && !isAnswered },
    )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>Author: {author.name}</span>
          <span>{createdAt}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}