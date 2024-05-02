export const Header = () => {
  const classes = `hover:text-violet-600 hover:border-b-2 hover:border-violet-600  duration-100 transition-all`;
  return (
    <>
      <div className="border rounded-3xl border-violet-800 font-bold px-4 py-4 bg-violet-800 md:m-0">
        <p className="text-slate-100 text-5xl font-merriweather">
          Image Detection
        </p>
      </div>
      <div className=" flex flex-col items-end md:flex-row">
        <div className="mt-10 space-x-8 text-xl font-normal">
          <a href="#Homepage" className={classes}>
            Home
          </a>
          <a href="#Features" className={classes}>
            Features
          </a>
          <a href="#Function" className={classes}>
            Function
          </a>
          <a href="#About" className={classes}>
            About
          </a>
        </div>
      </div>
    </>
  );
};
