const Loading = (props) => {
    const { center } = props;
    return <div className={center ? 'loading loading-center' : 'loading'}></div>
}

export default Loading
