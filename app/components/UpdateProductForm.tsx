import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Checkbox, TextField, Typography, FormControlLabel, Alert } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import DropdownSelect from './ui/DropdownSelect';

interface UpdateProductFormProps {
  productId?: string;
}

interface FormData {
  productCategory: string;
  productSubcategory: string;
  productName: string;
  productPrice: number;
  productQuantity: number;
  productDescription: string;
  taxCode: string;
  glAccount: string;
  materialGroup: string;
  productVAT: number;
  trackProductQuantity: boolean;
}

const UpdateProductForm = ({ productId }: UpdateProductFormProps) => {
  const router = useRouter();
  // const params = useParams(); 
  // const id = params?.id as string | undefined;
  // const id = productId;

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    productCategory: '',
    productSubcategory: '',
    productName: '',
    productPrice: 0,
    productQuantity: 0,
    productDescription: '',
    taxCode: '',
    glAccount: '',
    materialGroup: '',
    productVAT: 0,
    trackProductQuantity: false,
  });

  // Dropdown options state
  const [ dropdownOptions ] = useState({
    categories: ['Category A', 'Category B', 'Category C'],
    subcategories: ['Subcategory X', 'Subcategory Y', 'Subcategory Z'],
    taxCodes: ['Tax Code 1', 'Tax Code 2', 'Tax Code 3'],
    glAccounts: ['GL Account 1', 'GL Account 2', 'GL Account 3'],
    materialGroups: ['Material Group A', 'Material Group B', 'Material Group C'],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch product and dropdown options
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        console.log('Fetching product with ID:', productId); // Log the ID being used
  
        if (productId) {
          const productRef = doc(db, 'products', productId);
          const productSnapshot = await getDoc(productRef);
  
          console.log('Product snapshot exists:', productSnapshot.exists()); // Log if snapshot exists
          console.log('Product data:', productSnapshot.data()); // Log the actual data
  
          if (productSnapshot.exists()) {
            const productData = productSnapshot.data() as FormData;
            console.log('Setting form data:', productData);
            setFormData(productData);
            setError(null);
          } else {
            console.warn('No product found with this ID');
            setError('No product found. You can create a new one.');
          }
        }
      } catch (err) {
        console.error('Error fetching product data:', err);
        setError('Failed to fetch product data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProductData();
  }, [productId]);
  

  // Handle form input changes
  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({ 
  //     ...prev, 
  //     [name]: value 
  //   }));
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: 
        name === 'productPrice' || 
        name === 'productQuantity' || 
        name === 'productVAT' 
          ? Number(value) 
          : value 
    }));
  };

  const handleDropdownChange = (name: string, value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      console.log('Submit - Product ID:', productId); // Log the ID during submit
  
      const submitData = {
        ...formData,
        productPrice: Number(formData.productPrice),
        productQuantity: Number(formData.productQuantity),
        productVAT: Number(formData.productVAT)
      };
  
      const productRef = productId
        ? doc(db, 'products', productId)
        : doc(collection(db, 'products'));
  
      console.log('Saving to document:', productRef.id); 
  
      await setDoc(productRef, submitData);
  
      router.push('/products');
    } catch (err) {
      console.error('Failed to save product:', err);
      setError('Failed to save product. Please try again.');
    }
  };

  
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div className='grid justify-items-center w-screen py-8 lg:py-0'>
      <Typography variant="h4" gutterBottom>
        {productId ? 'Update Existing Product' : 'Create New Product'}
      </Typography>

      {error && <Alert severity="info">{error}</Alert>}

      <form onSubmit={handleSubmit} className='grid md:grid-cols-3 w-4/5 gap-y-4 md:gap-y-0 md:gap-x-10 items-baseline'>
        <DropdownSelect
          label="Product Category"
          name="productCategory"
          value={formData.productCategory}
          options={dropdownOptions.categories}
          onChange={(e) => handleDropdownChange('productCategory', e.target.value)}
          fullWidth
          margin="normal"
        />
        <DropdownSelect
          label="Product Subcategory"
          name="productSubcategory"
          value={formData.productSubcategory}
          options={dropdownOptions.subcategories}
          onChange={(e) => handleDropdownChange('productSubcategory', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Product Name"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Product Price"
          name="productPrice"
          type="number"
          // value={formData.productPrice}
          // onChange={handleChange}
          value={formData.productPrice === 0 ? '' : formData.productPrice}
          onChange={(e) => {
            const value = e.target.value === '' ? 0 : Number(e.target.value);
            setFormData(prev => ({ ...prev, productPrice: value }));
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Product Quantity"
          name="productQuantity"
          type="number"
          // value={formData.productQuantity}
          // onChange={handleChange}
          value={formData.productQuantity === 0 ? '' : formData.productQuantity}
          onChange={(e) => {
            const value = e.target.value === '' ? 0 : Number(e.target.value);
            setFormData(prev => ({ ...prev, productQuantity: value }));
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Product Description"
          name="productDescription"
          value={formData.productDescription}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <DropdownSelect
          label="Tax Code"
          name="taxCode"
          value={formData.taxCode}
          options={dropdownOptions.taxCodes}
          onChange={(e) => handleDropdownChange('taxCode', e.target.value)}
          fullWidth
          margin="normal"
        />
        <DropdownSelect
          label="GL Account"
          name="glAccount"
          value={formData.glAccount}
          options={dropdownOptions.glAccounts}
          onChange={(e) => handleDropdownChange('glAccount', e.target.value)}
          fullWidth
          margin="normal"
        />
        <DropdownSelect
          label="Material Group"
          name="materialGroup"
          value={formData.materialGroup}
          options={dropdownOptions.materialGroups}
          onChange={(e) => handleDropdownChange('materialGroup', e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Product VAT (%)"
          name="productVAT"
          type="number"
          // value={formData.productVAT}
          // onChange={handleChange}
          value={formData.productVAT === 0 ? '' : formData.productVAT}
          onChange={(e) => {
            const value = e.target.value === '' ? 0 : Number(e.target.value);
            setFormData(prev => ({ ...prev, productVAT: value }));
          }}
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="trackProductQuantity"
              checked={formData.trackProductQuantity}
              onChange={handleCheckboxChange}
            />
          }
          label="Track Product Quantity"
        />
        <Button type="submit" variant="contained" className='bg-orange-500 py-3 hover:bg-orange-700 capitalize text-lg' fullWidth sx={{ mt: 3 }}>
          {productId ? 'Update Product' : 'Create Product'}
        </Button>
      </form>
    </div>
  );
};

export default UpdateProductForm;
