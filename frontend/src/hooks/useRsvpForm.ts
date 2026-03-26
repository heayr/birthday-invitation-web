// import { useState } from 'react';
// // import { RsvpData, RsvpResponse } from '../types';
// import type { RsvpData, RsvpResponse } from '../types';
// interface UseRsvpFormReturn {
//   formData: RsvpData;
//   loading: boolean;
//   response: RsvpResponse | null;
//   handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   handleSubmit: (e: React.FormEvent) => Promise<void>;
// }

// export const useRsvpForm = (): UseRsvpFormReturn => {
//   const [formData, setFormData] = useState<RsvpData>({
//     name: '',
//     email: '',
//     attending: true,
//     plusOne: 0,
//     comment: ''
//   });

//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState<RsvpResponse | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'number' ? parseInt(value) || 0 : value
//     }));
//   };

//   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: checked
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setResponse(null);

//     try {
//       const res = await fetch('http://localhost:3001/rsvp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       setResponse(data);

//       if (data.success) {
//         // Очищаем форму при успехе
//         setFormData({
//           name: '',
//           email: '',
//           attending: true,
//           plusOne: 0,
//           comment: ''
//         });
//       }
//     } catch (error) {
//       setResponse({
//         success: false,
//         message: 'Ошибка соединения с сервером'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     formData,
//     loading,
//     response,
//     handleChange,
//     handleCheckboxChange,
//     handleSubmit
//   };
// };



// ! new 

import { useState } from 'react';
import type { RsvpData, RsvpResponse } from '../types';

interface UseRsvpFormReturn {
  formData: RsvpData;
  loading: boolean;
  response: RsvpResponse | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const useRsvpForm = (): UseRsvpFormReturn => {
  const [formData, setFormData] = useState<RsvpData>({
    name: '',
    email: '',
    attending: true,
    plusOne: 0,
    comment: ''
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<RsvpResponse | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('http://localhost:3001/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      // Приводим к RsvpResponse
      if (data.success) {
        setResponse({
          success: true,
          message: data.message || 'Спасибо!',
          name: formData.name,
          attending: formData.attending,
          plusOne: formData.plusOne
        });
        setFormData({
          name: '',
          email: '',
          attending: true,
          plusOne: 0,
          comment: ''
        });
      } else {
        setResponse({
          success: false,
          message: data.message || 'Ошибка',
          name: '',
          attending: false,
          plusOne: 0
        });
      }
    } catch (err) {
      setResponse({
        success: false,
        message: 'Ошибка соединения с сервером',
        name: '',
        attending: false,
        plusOne: 0
      });
    } finally {
      setLoading(false);
    }
  };

  return { formData, loading, response, handleChange, handleCheckboxChange, handleSubmit };
};