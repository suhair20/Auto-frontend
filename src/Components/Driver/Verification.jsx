import React,{useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useVerificationMutation } from '../../slices/driverSlice';


function Verification() {

  const navigate = useNavigate()

  const location = useLocation();
  const email = location.state?.email;

    const [profileImage, setProfileImage] = useState('');
  const [licenseImage, setLicenseImage] = useState('');
  const [modalImage, setModalImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image1,setImage1]=useState('')
  const [image2,setImage2]=useState('')

  const [Verification,{isLoading:loadingVerification}]=useVerificationMutation()

  const [name,setName]=useState('')
  const [experience,setExperience]=useState('')
  const[phone,setPhone]=useState('')
  const [Model,setModel]=useState('')
  const [VehicelNumber,setVehicelNumber]=useState('')
  const [color,setColor]=useState('')
  

const handelSubmit=async(e)=>{
  e.preventDefault()
  console.log(name);
  const formData = new FormData();
  formData.append('name', name);
  formData.append('experience', experience);
  formData.append('phone', phone);
  formData.append('model', Model);
  formData.append('vehicleNumber', VehicelNumber);
  formData.append('color', color);
  formData.append('email', email);
  console.log(image1,'images1');
  console.log(image2);
  if (image1) formData.append('image', image1);
  if (image2) formData.append('image', image2);

 
  try {
    const res=await Verification(formData).unwrap()
   console.log("come");
    navigate('/dashboard')
    
  } catch (error) {
    console.log(error);
  }
}

  const handleImage1Change = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      setImage1(file)
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };
  const handleImage2Change = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      setImage2(file)
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage('');
  };
  return (
    
   
    <>
    <div className='absolute  inset-0 bold-navbar opacity-40 z-0' ></div>
      <div className='h-screen flex flex-col items-center relative z-10  px-4' >
      <div className='text-center mt-20'>
        <h1 className='font-robot-bold text-5xl text-black '>Welcome</h1>
        <div className='mt-2 flex items-center justify-center text-black'>
          <p>Here is what you need to do to set up your account</p>
        
        </div>
      </div>
     
      
  <div className='flex flex-col lg:flex-row w-full max-w-4xl mt-10'>
    <form onSubmit={handelSubmit} className='grid grid-cols-1 lg:grid-cols-3 gap-4 w-full'>
      {/* First Column */}
      <div className='space-y-4'>
        <div>
          <label htmlFor='name' className='block text-sm font-medium text-black'>
            Name
          </label>
          <input
            type='name'
            id='name'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            name='name'
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            placeholder='Your name'
          />
        </div>
        <div>
          <label htmlFor='experience' className='block text-sm font-medium text-black'>
            Experience
          </label>
          <input
            type='number'
            id='experience'
            value={experience}
            onChange={(e)=>setExperience(e.target.value)}
            name='experience'
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            placeholder='Your experience'
          />
        </div>
        <div>
          <label htmlFor='confirm-password' className='block text-sm font-medium text-black'>
            Phone
          </label>
          <input
            type='number'
            id='number'
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            name='number'
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            placeholder='phone number'
          />
        </div>
       
      </div>

      {/* Second Column */}
      <div className='space-y-4'>
      <div>
          <label htmlFor='Model' className='block text-sm font-medium text-black'>
            Vehicel Model
          </label>
          <input
            type='text'
            id='model'
            value={Model}
            onChange={(e)=>setModel(e.target.value)}
            name='model'
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            placeholder='Your vehicel model '
          />
        </div>
        <div>
          <label htmlFor='vehicel number' className='block text-sm font-medium text-black'>
            vehicel number
          </label>
          <input
            type='number'
            value={VehicelNumber}
            onChange={(e)=>setVehicelNumber(e.target.value)}
            id='number'
            name='number'
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            placeholder='Your vehicel number'
          />
        </div>
        <div>
          <label htmlFor='color' className='block text-sm font-medium text-black'>
            color
          </label>
          <input
            type='text'
             value={color}
             onChange={(e)=>setColor(e.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            placeholder='Your vehicel color'
          />
        </div>
      </div>

      {/* Third Column */}
      <div className='space-y-4'>
      {/* Profile Image Upload */}
      <div className='flex flex-row gap-4 items-center'>
        <div>
        <label htmlFor='profile-image' className='block text-sm font-medium text-black'>
          Profile Image
        </label>
        <input
          type='file'
          id='profile-image'
          name='profile-image'
          className='mt-1 w-full border border-gray-300 rounded-md py-2 px-3'
          onChange={(e) => handleImage1Change(e, setProfileImage)}

        />
        </div>
        <div className='w-40 h-20' >
        {profileImage && (
          <img
            src={profileImage}
            alt='Profile Thumbnail'
            className='mt-2 cursor-pointer w-20 h-20 object-cover border border-gray-300 rounded-md'
            onClick={() => openModal(profileImage)}
          />
        )}
        </div>
      </div>

      {/* License Image Upload */}
      <div className='flex flex-row gap-4 items-center'>
        <div>
        <label htmlFor='license-image' className='block text-sm font-medium text-black'>
          License Image
        </label>
        <input
          type='file'
          id='license-image'
          name='license-image'
          className='mt-1 w-full border border-gray-300 rounded-md py-2 px-3'
          onChange={(e) => handleImage2Change(e, setLicenseImage)}
        />
        </div>
        <div className='w-40 h-20'>
        {licenseImage && (
          <img
            src={licenseImage}
            alt='License Thumbnail'
            className='mt-2 cursor-pointer w-20 h-20 object-cover border border-gray-300 rounded-md'
            onClick={() => openModal(licenseImage)}
          />
        )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center'>
          <span
            className='absolute top-4 right-4 text-white text-2xl cursor-pointer'
            onClick={closeModal}
          >
            ×
          </span>
          <img
            src={modalImage}
            alt='Full Size'
            className='max-w-full max-h-full'
          />
        </div>
      )}
    </div>
    <div className=" flex items-center justify-center ">
    <button
          type='submit'
          className='w-full bold-navbar mt-8  text-white py-2 px-4 rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bold-navbar'
        >
          Create Acount
        </button>
        </div>
    </form>
  </div>
    

      </div>
    </>
   
  )
}

export default Verification

