
const Homepage = () => {
  const image='https://cdn.pixabay.com/photo/2019/05/22/10/54/street-signs-4221204_1280.png';
  return <section id='Homepage' className="mb-20">
  <div className="flex flex-col space-x-10 md:flex-row" >
    <div className="flex flex-col justify-center items-center w-full md:w-1/2 ">
      <h1 className="font-merriweather text-5xl leading-relaxed font-bold text-center text-violet-600">Welcome to Traffic Sign Detection</h1>
      <p className="text-gray-600 text-center leading-relaxed mt-5 text-xl">The Convolutional Neural Network (CNN) is a popular model used for training traffic sign detection in Python. CNNs are well-suited for image classification tasks due to their ability to automatically learn and extract relevant features from images.</p>
      
    </div>
  <img src={image} alt="Traffic Sign" className="hidden w-1/2 h-1/2 md:block "/>
  </div>
  </section>
};

export default Homepage;
