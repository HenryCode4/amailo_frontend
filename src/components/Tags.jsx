
import { Link } from 'react-router-dom';

 // className={'container-tags'}
      // style={{
      //   justifyContent: forFoodPage ? 'start' : 'center',
      // }}
export default function Tags({ tags, forFoodPage }) {


  const handleTagClick = (tagId) => {
    const selected = tags.find((tag) => tag.imageUrl === tagId);
    localStorage.setItem("selected", JSON.stringify(selected));
  };

  
  return (
    <div
     
      className=' pb-6 px-6 pt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-center items-center '
    >
      {tags.map(tag => (
        <Link 
        onClick={() => handleTagClick(tag.imageUrl)}
        className='m-4 shadow-md rounded-full flex flex-col justify-center items-center' key={tag.name} to={`/food-branch/${tag.name}`}>
          <img className='w-[100px] h-[100px] object-cover rounded-full' src={`${tag.imageUrl}`}  alt="" />
          
          <p className='font-semibold text-[0.8rem] md:text-[1.1rem] pb-2 text-gray-500'>{tag.name}
          {!forFoodPage && `(${tag.count})`}</p>
          
        </Link>
      ))}
    </div>
  );
}

// const TagCard = ({ tag, forFoodPage }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-4 m-2">
      
//       <Link className="text-xl font-semibold text-gray-800 hover:text-blue-500" to={`/tag/${tag.name}`}>
//         {tag.name}
//       </Link>
      
//       {!forFoodPage && <span className="text-sm text-gray-600 ml-1">({tag.count})</span>}
//     </div>
//   );
// };

// const TagList = ({ tags, forFoodPage }) => {
//   return (
//     <div className="pt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
//       {tags.map(tag => (
//         <TagCard key={tag.name} tag={tag} forFoodPage={forFoodPage} />
//       ))}
//     </div>
//   );
// };

// export default TagList;