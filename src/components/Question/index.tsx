import './styles.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  createdAt: string;
}

export function Question({
  content,
  author,
  createdAt,
}: QuestionProps) { //props: - get all info |  { field1, field2 } - get only what you need
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>Author: {author.name}</span>
          <span>{createdAt}</span>
        </div>
        <div>Buttons</div>
      </footer>
    </div>
  );
}