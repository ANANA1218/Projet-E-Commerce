import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

function Template(props) {
    return (
        <>
            <Header />
            <Content>{props.children}</Content>
            <Footer />
        </>
    );
}

export default Template;
