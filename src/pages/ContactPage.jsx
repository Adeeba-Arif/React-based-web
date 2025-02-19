const ContactPage = () => {
    return (
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-xl font-bold">Contact Us</h1>
        <form>
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" className="border p-2 w-full" />
          <label>Message:</label>
          <textarea placeholder="Your message" className="border p-2 w-full" />
          <center>
          <button type="submit" className="bg-blue-500 text-white p-2 mt-2 rounded-lg">Send</button>
          </center>
        </form>
      </div>
    );
  };
  
  export default ContactPage;