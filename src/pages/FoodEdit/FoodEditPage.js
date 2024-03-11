// import { useParams } from 'react-router-dom';
// import classes from './foodEdit.module.css';
// import { useForm } from 'react-hook-form';
// import { useEffect, useState } from 'react';
// import { add, getById, update } from '../../services/foodService';
// import Title from '../../components/Title';
// import InputContainer from '../../components/InputContainer/InputContainer';
// import Input from '../../components/Input/Input';
// import Button from '../../components/Button/Button';
// import { uploadImage } from '../../services/uploadService';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// export default function FoodEditPage() {
//   const { foodId } = useParams();
//   const [imageUrl, setImageUrl] = useState();
//   const isEditMode = !!foodId;

//   const navigate = useNavigate();

//   const {
//     handleSubmit,
//     register,
//     formState: { errors },
//     reset,
//   } = useForm();

//   useEffect(() => {
//     if (!isEditMode) return;

//     getById(foodId).then(food => {
//       if (!food) return;
//       reset(food);
//       setImageUrl(food.imageUrl);
//     });
//   }, [foodId]);

//   const submit = async foodData => {
//     const food = { ...foodData, imageUrl };

//     if (isEditMode) {
//       await update(food);
//       toast.success(`Food "${food.name}" updated successfully!`);
//       return;
//     }

//     const newFood = await add(food);
//     toast.success(`Food "${food.name}" added successfully!`);
//     navigate('/admin/editFood/' + newFood.id, { replace: true });
//   };

//   const upload = async event => {
//     setImageUrl(null);
//     const imageUrl = await uploadImage(event);
//     setImageUrl(imageUrl);
//   };

//   return (
//     <div className={classes.container}>
//       <div className={classes.content}>
//         <Title title={isEditMode ? 'Edit Food' : 'Add Food'} />
//         <form
//           className={classes.form}
//           onSubmit={handleSubmit(submit)}
//           noValidate
//         >
//           <InputContainer label="Select Image">
//             <input type="file" onChange={upload} accept="image/jpeg" />
//           </InputContainer>

//           {imageUrl && (
//             <a href={imageUrl} className={classes.image_link} target="blank">
//               <img src={imageUrl} alt="Uploaded" />
//             </a>
//           )}

//           <Input
//             type="text"
//             label="Name"
//             {...register('name', { required: true, minLength: 5 })}
//             error={errors.name}
//           />

//           <Input
//             type="number"
//             label="Price"
//             {...register('price', { required: true })}
//             error={errors.price}
//           />

//           <Input
//             type="text"
//             label="Tags"
//             {...register('tags')}
//             error={errors.tags}
//           />

//           <Input
//             type="text"
//             label="Origins"
//             {...register('origins', { required: true })}
//             error={errors.origins}
//           />

//           <Input
//             type="text"
//             label="Cook Time"
//             {...register('cookTime', { required: true })}
//             error={errors.cookTime}
//           />

//           <Button type="submit" text={isEditMode ? 'Update' : 'Create'} />
//         </form>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Title from '../../components/Title';
import InputContainer from '../../components/InputContainer/InputContainer';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { uploadImage } from '../../services/uploadService';
import { add, getById, update } from '../../services/foodService';
import classes from './foodEdit.module.css';

export default function FoodEditPage() {
  const { foodId } = useParams();
  const [imageUrl, setImageUrl] = useState();
  const [tags, setTags] = useState([]);
  const isEditMode = !!foodId;
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    if (!isEditMode) return;

    getById(foodId).then(food => {
      if (!food) return;
      reset(food);
      setImageUrl(food.imageUrl);
      setTags(food.tags); // Set the tags array with imageUrlTags
    });
  }, [foodId]);

  const submit = async foodData => {
    const food = { ...foodData, imageUrl, tags };

    if (isEditMode) {
      await update(food);
      toast.success(`Food "${food.name}" updated successfully!`);
      return;
    }

    const newFood = await add(food);
    toast.success(`Food "${food.name}" added successfully!`);
    navigate('/admin/editFood/' + newFood.id, { replace: true });
  };

  const upload = async event => {
    setImageUrl(null);
    const imageUrl = await uploadImage(event);
    setImageUrl(imageUrl);
  };

  const handleTagChange = async event => {
    const { name, value } = event.target;
    const imageUrl = await uploadImage(value); // Assuming uploadImage takes the image file and returns its URL
    setTags(prevTags => [...prevTags, { name: value, imageUrlTags: imageUrl }]);
    setValue(name, ''); // Clear the input field
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Title title={isEditMode ? 'Edit Food' : 'Add Food'} />
        <form className={classes.form} onSubmit={handleSubmit(submit)} noValidate>
          <InputContainer label="Select Image">
            <input type="file" onChange={upload} accept="image/jpeg" />
          </InputContainer>

          {imageUrl && (
            <a href={imageUrl} className={classes.image_link} target="blank">
              <img src={imageUrl} alt="Uploaded" />
            </a>
          )}

          <Input
            type="text"
            label="Name"
            {...register('name', { required: true, minLength: 5 })}
            error={errors.name}
          />

          <Input
            type="number"
            label="Price"
            {...register('price', { required: true })}
            error={errors.price}
          />

          <Input
            type="text"
            label="Tags"
            name="tag" // Give a name for the input field
            onChange={handleTagChange} // Handle tag changes
            error={errors.tags}
          />

          {/* Display current tags */}
          <div>
            {tags.map((tag, index) => (
              <span key={index}>{tag.name}</span>
            ))}
          </div>

          <Input
            type="text"
            label="Origins"
            {...register('origins', { required: true })}
            error={errors.origins}
          />

          <Input
            type="text"
            label="Cook Time"
            {...register('cookTime', { required: true })}
            error={errors.cookTime}
          />

          <Button type="submit" text={isEditMode ? 'Update' : 'Create'} />
        </form>
      </div>
    </div>
  );
}
