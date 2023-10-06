import './LoadingBtn.css'

function LoadingBtn({btnText}) {
  return (
    <button className='button-loader' disabled>
        <span className='button-text'>
            {btnText}
        </span>
    </button>
  )
}

export default LoadingBtn