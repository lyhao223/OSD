import ListTechnology from "./ListTechnology";

import { DUMMY_DATA } from "../../data/dummy";

const Technology = () => {
  return (
    <section id="Features" className="mb-12">
        <div className="w-auto h-1/3 bg-violet-800 p-0 font-merriweather">
            <h2 className="py-10 text-5xl font-medium text-white mb-3">Technology</h2>
            <p className="mb-20 text-white text-2xl">These are all the languages, libraries, frameworks and tools that make up the Traffic Sign Detection app.</p>
            <div className="grid gap-10 grid-cols-1 xl:grid-cols-3">
                {DUMMY_DATA.map((data) => (
                   <ListTechnology id={data.id} key={data.id} img={data.image} title={data.title} description={data.description} />
                ))}
            </div>
        </div>
    </section>
    
  )
}

export default Technology
