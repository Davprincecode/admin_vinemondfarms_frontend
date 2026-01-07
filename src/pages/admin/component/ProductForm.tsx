import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';

interface ProductFormState {
  name: string;
  description: string;
  categories: string[];
  tags: string[];
  price: string;
  discountPrice: string;
  stock: 'unlimited' | 'custom' | '';
  image: File | null;
  color: string;
  colorImage: string;
  size: string;
  sizePrice: string;
}

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormState>({
    name: '',
    description: '',
    categories: [],
    tags: [],
    price: '',
    discountPrice: '',
    stock: '',
    image: null,
    color: '',
    colorImage: '',
    size: '',
    sizePrice: '',
  });

  const [tagInput, setTagInput] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (category: string) => {
    setFormData(prev => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }));
  };

  return (
    <div className="product-form-con">
      {/* Product Info */}
      <div className="product-form-top flex justification-between">
        <div className="admin-prd-form">
          <div className="admin-prod-title">Information</div>
          <div className="admin-input">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Product Name"
            />
          </div>
          <div className="admin-input">
            <label>Product Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              cols={30}
              rows={10}
              placeholder="Product Description"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="prod-category">
          <div className="admin-prod-title">Categories</div>
          {['mens fashions', 'women fashions'].map(cat => (
            <div key={cat} className="prod-cat-item flex-center gap-10">
              <input
                type="checkbox"
                checked={formData.categories.includes(cat)}
                onChange={() => handleCheckboxChange(cat)}
              />
              <p>{cat}</p>
            </div>
          ))}
          <div className="create-new">Create New</div>
        </div>
      </div>

      {/* Image & Tags */}
      <div className="product-form-top flex justification-between">
        <div className="admin-prd-form">
          <div className="admin-prod-title">Product Image</div>
          <div className="uploadWrapper">
            <label htmlFor="file-input">Add Files</label>
            <input id="file-input" type="file" onChange={handleFileChange} />
            <p>or drag and drop files</p>
          </div>
        </div>

        <div className="prod-category">
          <div className="admin-prod-title">Tags</div>
          <div className="admin-input">
            <label>Add Tags</label>
            <input
              type="text"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              placeholder="Enter Tag Name"
              onKeyDown={e => e.key === 'Enter' && handleAddTag()}
            />
          </div>
          <div className="addTags flex-center gap-10">
            {formData.tags.map(tag => (
              <div key={tag} className="addTag flex-center gap-10">
                <p>{tag}</p>
                <RxCross2 onClick={() => handleRemoveTag(tag)} />
              </div>
            ))}
          </div>
          <div className="create-new">Create New</div>
        </div>
      </div>

      {/* Price & Stock */}
      <div className="product-form-top flex justification-between">
        <div className="admin-prd-form">
          <div className="admin-prod-title">Price</div>
          <div className="admin-flex-input flex-center gap-10">
            <div className="admin-input">
              <label>Product Price</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter Price"
              />
            </div>
            <div className="admin-input">
              <label>Discount Price</label>
              <input
                type="text"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleInputChange}
                placeholder="Enter Discount Price"
              />
            </div>
          </div>
          <div className="admin-flex-input flex-center gap-10">
            <div className="admin-input">
              <label>Available Stock</label>
              <select
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
              >
                <option value="">Available stock</option>
                <option value="unlimited">Unlimited</option>
                <option value="custom">Custom</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="product-form-top flex justification-between">
        <div className="admin-prd-form">
          <div className="admin-prod-title">Different Option</div>
          <div className="admin-flex-input flex-center gap-10">
            <div className="admin-input">
              <label>Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                placeholder="Enter Color"
              />
            </div>
            <div className="admin-input">
              <label>Color Image</label>
              <input
                type="text"
                name="colorImage"
                value={formData.colorImage}
                onChange={handleInputChange}
                placeholder="Enter Color Image URL"
              />
            </div>
          </div>
          <div className="admin-flex-input flex-center gap-10">
            <div className="admin-input">
              <label>Size</label>
              <select
                name="size"
                value={formData.size}
                onChange={handleInputChange}
              >
                <option value="">Size</option>
                <option value="x">x</option>
                <option value="md">md</option>
                <option value="xl">xl</option>
                <option value="xxl">xxl</option>
              </select>
            </div>
            <div className="admin-input">
              <label>Price</label>
              <input
                type="text"
                name="sizePrice"
                value={formData.sizePrice}
                onChange={handleInputChange}
                placeholder="Price"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
