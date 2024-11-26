import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CTAButton, ErrorStatement, Input, OutlineButton } from "../components";
import { isEditorEmpty } from "../functions/regexFunctions";
import { FaArrowDown } from "react-icons/fa6";
import { axiosInstance } from "../utils/axios";
import { toast, Toaster } from "react-hot-toast";
import { getMinsToRead } from "../functions/mathFunctions";
import { modules, formats, QuillToolbar } from "../components/QuillToolbar";
import dayjs from "dayjs";

const CreatePost = () => {
  // Ref for file input
  const fileRef = useRef();
  // State for text editor input
  const [value, setValue] = useState();
  // State for disabling button
  const [disabled, setDisabled] = useState(false);
  // State for adding image
  const [imageFile, setImageFile] = useState();
  // State for adding title of post
  const [title, setTitle] = useState();
  // Error states
  const [error, setError] = useState({
    title: 0,
    category: 0,
    image: 0,
    content: 0,
    other: 0,
  });
  // Admin password
  const [password, setPassword] = useState();
  // Is Viewable
  const [isViewable, setIsViewable] = useState(false);

  // Scroll to top of page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Set window title.
  useEffect(() => {
    document.title = "Create a new Post | GridBox F1";
  }, []);

  // Open text editor if password is entered
  useEffect(() => {
    if (password == import.meta.env.VITE_ADMINPASS) {
      setIsViewable(true);
    }
  }, [password, setIsViewable]);

  // To save the post
  const handleSave = () => {
    setError({
      title: 0,
      category: 0,
      image: 0,
      content: 0,
    });

    // Check if title is empty
    if (title == null || title == undefined || title.length <= 0) {
      setError((prev) => ({ ...prev, title: 1 }));
      return;
    }
    // If title is longer than 100 characters.
    else if (title.length > 100) {
      setError((prev) => ({ ...prev, title: 2 }));
      return;
    }
    // Check if image has been added
    else if (imageFile == null || imageFile == undefined) {
      setError((prev) => ({ ...prev, image: 1 }));
      return;
    }

    // Check if content has been added for blog
    if (isEditorEmpty(value)) {
      setError((prev) => ({ ...prev, content: 1 }));
      return;
    }

    // Adding data to FormData object
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("title", title);
    formData.append("content", String(value));
    setDisabled(true);

    // Sending request to server
    axiosInstance
      .post("/create-post", formData, {
        headers: {
          "Content-Type": "multipart/formdata",
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Post created!");
        setDisabled(false);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.log(err);
        setDisabled(false);
      });
  };

  // To get image input
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
    fileRef.current.value = null;
  };

  return (
    <main className="bg-greyBG">
      <Toaster />

      {isViewable ? (
        <>
          {/* Editor box */}
          <div className="p-10 pb-20 m-5 lg:m-10 bg-white shadow-xl border-[1px] rounded-xl">
            {/* Title */}
            <h1 className="text-2xl lg:text-4xl text-center font-medium">
              Create a new Article{" "}
            </h1>
            {/* Subtitle */}
            <p className="text-base mt-2 lg:text-xl text-center">
              (You can preview your article below!)
            </p>

            {/* Input fields */}
            {/* Horizontal Flex on larger screens */}
            <div className="mt-10 lg:mt-24 lg:flex lg:gap-x-16">
              {/* Add Post title */}
              <div className="lg:flex-1">
                <p className="font-medium">Title</p>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={"Enter the title of your post"}
                />
                {error.title == 1 && (
                  <ErrorStatement
                    text={"Please enter the title of your post."}
                  />
                )}
                {error.title == 2 && (
                  <ErrorStatement
                    text={"Title cannot exceed 100 characters."}
                  />
                )}
              </div>

              {/* Add Post thumbnail image */}
              <div className="mt-8 lg:mt-0 lg:flex-1">
                <p className="font-medium">Thumbnail</p>
                {/* Hidden input box - used to accept images */}
                <input
                  className="hidden"
                  type="file"
                  ref={fileRef}
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handleFileChange}
                />
                {/* Flex div - button & image name */}
                <div className="mt-3 flex flex-col gap-y-2 md:gap-y-0 md:flex-row md:gap-x-5 items-center">
                  <div className="w-full md:flex-1">
                    {/* Button to open file input  */}
                    <OutlineButton
                      text={
                        <p className="flex gap-x-3 justify-center items-center">
                          Select your image
                        </p>
                      }
                      onClick={() => fileRef.current.click()}
                    />
                  </div>
                  {/* Display file name */}
                  <p className="flex-1 overflow-hidden">{imageFile?.name}</p>
                </div>
                {error.image == 1 && (
                  <ErrorStatement text={"Please add an image for your post."} />
                )}
              </div>
            </div>

            {/* Quill Editor */}
            <div className="mt-10">
              {error.content == 1 && (
                <ErrorStatement
                  text={"Please add the content for your post."}
                />
              )}
              <QuillToolbar />
              <ReactQuill
                theme="snow"
                className="h-96 mt-1"
                value={value}
                onChange={setValue}
                modules={modules}
                formats={formats}
              />
            </div>

            {/* Save Button */}
            <div className="mt-24 lg:mt-20 flex justify-center">
              <div className="w-[45%] lg:w-[30%]">
                <CTAButton
                  disabledText={"Please wait..."}
                  disabled={disabled}
                  onClick={handleSave}
                  text="Save"
                  className="md:w-full"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <h1 className="py-5 text-2xl lg:text-4xl text-center font-medium flex justify-center gap-x-2 items-center">
            Preview your Journal post! <FaArrowDown />
          </h1>

          {/* Preview Post */}
          <div className=" pb-20 m-5 lg:m-10 bg-white shadow-xl border-[1px] rounded-xl">
            {/* Thumbnail Image */}
            <div>
              {imageFile && (
                <img
                  src={URL.createObjectURL(imageFile)}
                  className="h-96 lg:h-[30rem] w-full rounded-t object-contain object-center"
                ></img>
              )}
            </div>

            {/* If nothing is added */}
            {!imageFile && !title && (!value || isEditorEmpty(value)) && (
              <div className="flex justify-center items-center pt-20 text-2xl">
                Create your Post Above!
              </div>
            )}

            {/* Title + Content Section */}
            <div className="p-5 md:p-10 md:pt-0 mt-8">
              {/* Post Title */}
              {title && (
                <h1 className="mt-10 text-4xl lg:text-6xl font-bold text-ink">
                  {title}
                </h1>
              )}

              {/* Post Author */}
              {(title?.length > 0 || (value && !isEditorEmpty(value))) && (
                <div className="mt-10 pl-5">
                  <p className="break-all font-medium">Admin</p>
                  <p className="break-all">{dayjs().format("MMM DD, YYYY")}.</p>
                </div>
              )}

              {/* Time to read */}
              {value && !isEditorEmpty(value) && (
                <div className="mt-4 px-5 text-greyText font-medium">
                  {getMinsToRead(value)} min read.
                </div>
              )}

              {/* Post Content */}
              {!isEditorEmpty(value) && (
                <div className="mt-10">
                  <ReactQuill
                    value={value}
                    className="border-none postdisplay"
                    theme="snow"
                    readOnly
                    modules={{ toolbar: null }}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        // Div to insert password
        <section className="min-h-screen flex justify-center items-center">
          <div className="flex gap-x-5">
            <label>Enter Admin Password :</label>
            <input
              type="password"
              className="w-40 rounded border-2"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
        </section>
      )}
    </main>
  );
};

export default CreatePost;
