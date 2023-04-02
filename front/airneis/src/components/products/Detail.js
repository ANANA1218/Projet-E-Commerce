const Detail = (props) => {

    let {
        name,
        content
    } = props

    return (
        <>
            <dt className="col-sm-4">{name}</dt>
            <dd className="col-sm-8 mb-3">{content}</dd>
        </>
    );
}

export default Detail;