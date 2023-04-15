import Header from "../components/layouts/Header";
import Content from "../components/layouts/Content";
import Footer from "../components/layouts/Footer";

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
