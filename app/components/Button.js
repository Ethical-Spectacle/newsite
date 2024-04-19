import Link from 'next/link';

function Button(props) {
  const { type, title, additionalClass, href } = props;
  const buttonClasses = `text-white px-4 py-1 rounded-md w-auto max-w-32 bg-rose-300 hover:bg-rose-400 ease-in duration-300 ${additionalClass} md:inline`;

  if (href) {
    return (
      <Link href={href} passHref className={buttonClasses}>
        {title}
      </Link>
    );
  }
  
  return (
    <button
      type={type}
      className={buttonClasses}
    >
      {title}
    </button>
  )
}

export default Button