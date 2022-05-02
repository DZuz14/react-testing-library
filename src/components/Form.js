import { useState } from 'react';

export default function Form({ onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <label htmlFor="name">Full name</label>

      <input
        id="name"
        name="name"
        type="text"
        placeholder="Your name"
        value={form.name}
        onChange={handleChange}
      />
      <br />

      <label htmlFor="email">Email</label>

      <input
        id="email"
        type="text"
        name="email"
        placeholder="xyz@gmail.com"
        value={form.email}
        onChange={handleChange}
      />
      <br />

      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
