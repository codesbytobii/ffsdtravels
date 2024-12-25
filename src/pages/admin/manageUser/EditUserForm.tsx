// const EditUserForm: React.FC<{ user: User; onSubmit: (user: User) => void }> = ({ user, onSubmit }) => {
//     const [formData, setFormData] = useState(user);
  
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const { name, value } = e.target;
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     };
  
//     const handleSubmit = (e: React.FormEvent) => {
//       e.preventDefault();
//       onSubmit(formData);
//     };
  
//     return (
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleChange}
//           placeholder="First Name"
//         />
//         {/* Add more input fields for other user properties */}
//         <Button type="submit" className="bg-primaryRed text-white">
//           Save Changes
//         </Button>
//       </form>
//     );
//   };

  
//   export default EditUserForm;