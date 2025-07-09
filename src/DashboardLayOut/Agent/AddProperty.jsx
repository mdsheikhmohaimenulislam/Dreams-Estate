import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { imageUpload } from '../../api/utils'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

const AddPropertyForm = () => {
  const { user } = useAuth()
  const [uploadedImage, setUploadedImage] = useState(null)
  const [imageUploadError, setImageUploadError] = useState(null)

  const { mutate: submitProperty, isPending: isSubmitting } = useMutation({
    mutationFn: async (propertyData) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-properties`,
        propertyData
      )
      return data
    },
    onSuccess: () => {
      toast.success('Property added successfully!')
      setUploadedImage(null)
      document.getElementById('add-property-form').reset()
    },
    onError: () => {
      toast.error('Submission failed!')
    },
  })




  const handleImageUpload = async (e) => {
    const image = e.target.files[0]
    try {
      const url = await imageUpload(image)
      setUploadedImage(url)
      setImageUploadError(null)
    } catch (err) {
        console.log(err);
      setImageUploadError('Image upload failed!')
    }
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target

    const property = {
      title: form.title.value,
      location: form.location.value,
      priceRange: form.priceRange.value,
      image: uploadedImage,
      agent: {
        name: user?.displayName,
        email: user?.email,
        image:user?.photoURL,
      },
    }

    if (!uploadedImage) {
      toast.error('Please upload an image')
      return
    }

    submitProperty(property)
  }

  return (
    <div className='w-full min-h-screen flex items-center justify-center bg-gray-50 p-5'>
      <form
        id='add-property-form'
        onSubmit={handleSubmit}
        className='bg-white rounded-xl shadow-md p-8 w-full max-w-3xl space-y-6'
      >
        <h2 className='text-2xl font-semibold text-center text-[#064d57]'>Add New Property</h2>

        {/* Property Title */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>Property Title</label>
          <input
            type='text'
            name='title'
            required
            className='mt-1 w-full px-4 py-2 border border-[#064d57] rounded-md focus:outline-[#064d57]'
            placeholder='Enter property title'
          />
        </div>

        {/* Property Location */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>Property Location</label>
          <input
            type='text'
            name='location'
            required
            className='mt-1 w-full px-4 py-2 border border-[#064d57] rounded-md focus:outline-[#064d57]'
            placeholder='Enter location'
          />
        </div>

        {/* Property Image */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Upload Property Image</label>
          <div className='flex items-center gap-5'>
            <label className='bg-[#064d57] text-white px-3 py-1 rounded-md cursor-pointer hover:bg-[#064d57]'>
              <input
                onChange={handleImageUpload}
                type='file'
                accept='image/*'
                hidden
              />
              Upload
            </label>
            {uploadedImage && <img src={uploadedImage} alt='Preview' className='w-24 rounded border' />}
          </div>
          {imageUploadError && <p className='text-red-500 text-sm'>{imageUploadError}</p>}
        </div>

        {/* Agent Info */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Agent Name</label>
            <input
              type='text'
              value={user?.displayName || ''}
              readOnly
              className='mt-1 w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Agent Email</label>
            <input
              type='email'
              value={user?.email || ''}
              readOnly
              className='mt-1 w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md'
            />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className='block text-sm font-medium text-gray-700'>Price Range</label>
          <input
            type='text'
            name='priceRange'
            required
            className='mt-1 w-full px-4 py-2 border border-[#064d57] rounded-md focus:outline-[#064d57]'
            placeholder='e.g. $200 - $500'
          />
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          disabled={isSubmitting}
          className='w-full py-3 mt-3 bg-[#064d57] text-white font-semibold rounded-md hover:bg-[#064d57] transition'
        >
          {isSubmitting ? 'Adding...' : 'Add Property'}
        </button>
      </form>
    </div>
  )
}

export default AddPropertyForm
