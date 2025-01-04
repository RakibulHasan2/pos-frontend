// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import CommonTopNab from '../../Shared/CommonTopNav/CommonTopNab';
import axios from 'axios';

export default function AddProduct() {
  const imageHosKey = '29473dd4ab78ebc95009722bc0558d38';
  const [formData, setFormData] = useState({
    p_name: '',
    p_category: '',
    p_brand: '',
    p_price: '',
    p_cost: '',
    p_quantity: '',
    p_unit: 'piece',
    tax: '',
    p_images: '',
    p_details: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(
        'https://api.imgbb.com/1/upload',
        formData,
        {
          params: {
            key: imageHosKey, // Replace with your actual ImgBB API key
          },
        }
      );
      setFormData((prevData) => ({
        ...prevData,
        p_images: response.data.data.url,
      }));
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/products/crateProduct', formData);
      console.log(response.data);
      alert('Product created successfully!');
      setFormData({
        p_name: '',
        p_category: '',
        p_brand: '',
        p_price: '',
        p_cost: '',
        p_quantity: '',
        p_unit: 'piece',
        tax: '',
        p_images: '',
        p_details: '',
      });
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product.');
    }
  };

  return (
    <div className="">
      <div>
        <CommonTopNab />
      </div>

      <div className="p-5">
        <div className="w-full min-h-screen border rounded-2xl">
          <div className="h-16 border-b flex items-center pl-5 text-2xl">
            <p>Add Product</p>
          </div>
          <div className="p-3">
            <small className="italic">
              The field labels marked with * are required input fields.
            </small>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-5 h-full flex-wrap items-center">
                <div>
                  <label className="label">
                    <span className="label-text">
                      Product name <span className="text-red-600">*</span>
                    </span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Product name"
                    name="p_name"
                    value={formData.p_name}
                    onChange={handleChange}
                    className="w-[320px] input border-[#00000026] border"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="label-text mb-2 mt-2">
                    Product Category<span className="text-red-600">*</span>
                  </span>
                  <select
                    required
                    name="p_category"
                    value={formData.p_category}
                    onChange={handleChange}
                    className="select w-[320px] input border-[#00000026] border"
                  >
                    <option disabled selected>
                      Select Category
                    </option>
                    <option>Processors</option>
                    <option>Motherboards</option>
                    <option>RAM</option>
                    <option>SSD</option>
                    <option>GPUs</option>
                    <option>PSUs</option>
                    <option>Monitors</option>
                    <option>Keyboards</option>
                    <option>Gaming Mouse</option>
                    <option>Laptops</option>
                  </select>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">
                      Brand<span className="text-red-600">*</span>
                    </span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Brand"
                    name="p_brand"
                    value={formData.p_brand}
                    onChange={handleChange}
                    className="w-[320px] input border-[#00000026] border"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">
                      Product Price <span className="text-red-600">*</span>
                    </span>
                  </label>
                  <input
                    required
                    type="number"
                    placeholder="Product Price"
                    name="p_price"
                    value={formData.p_price}
                    onChange={handleChange}
                    className="w-[320px] input border-[#00000026] border"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">
                      Product Cost <span className="text-red-600">*</span>
                    </span>
                  </label>
                  <input
                    required
                    type="number"
                    placeholder="Product Cost"
                    name="p_cost"
                    value={formData.p_cost}
                    onChange={handleChange}
                    className="w-[320px] input border-[#00000026] border"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">
                      Product Quantity
                      <span className="text-red-600">*</span>
                    </span>
                  </label>
                  <input
                    required
                    type="number"
                    placeholder="Product Quantity"
                    name="p_quantity"
                    value={formData.p_quantity}
                    onChange={handleChange}
                    className="w-[320px] input border-[#00000026] border"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">
                      Product unit
                      <span className="text-red-600">*</span>
                    </span>
                  </label>
                  <input
                    required
                    defaultValue="piece"
                    type="text"
                    placeholder="Product unit"
                    name="p_unit"
                    value={formData.p_unit}
                    onChange={handleChange}
                    className="w-[320px] input border-[#00000026] border"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Product Tax</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Product tax"
                    name="tax"
                    value={formData.tax}
                    onChange={handleChange}
                    className="w-[320px] input border-[#00000026] border"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">
                      Product Image
                      <span className="text-red-600">*</span>
                    </span>
                  </label>
                  <input
                    required
                    type="file"
                    onChange={handleFileUpload}
                    className="w-[320px] input border-[#00000026] border"
                  />
                </div>
                <div className="w-full h-20">
                  <label className="label">
                    <span className="label-text">
                      Details<span className="text-red-600">*</span>
                    </span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Details"
                    name="p_details"
                    value={formData.p_details}
                    onChange={handleChange}
                    className="w-[97%] h-full input border-[#00000026] border"
                  />
                </div>
              </div>
              <div className="mt-10">
                <button
                  type="submit"
                  className="btn bg-blue-500 hover:bg-blue-700 text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
