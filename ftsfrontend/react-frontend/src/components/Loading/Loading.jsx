// routes/LoadingScreen.jsx
const Loading = () => {
  return (
    <div className="h-screen  flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
        {/* <div id="myModal" class="modal">

          <div class="modal-content">
            <span class="close">&times;</span>
            <p>Some text in the Modal..</p>
          </div>

        </div> */}
    </div>

  );
};

export default Loading;
