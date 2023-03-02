import "../css/all-teams/footer.css"

const Footer = (props) => {
    const { logo1, logo2, logo3, logo4, link1, link2, link3, link4, linkShop, nameShop } = props.props;
    return (
        <div className="footer">
        <div className="footer_left">
            {logo1? <a href={link1} target="_blank"><img src={logo1} alt="logo1"  /></a> : ""}
            {logo2? <a href={link2} target="_blank"><img src={logo2} alt="logo2"  /></a> : ""}
            {logo3? <a href={link3} target="_blank"><img src={logo3} alt="logo3"  /></a> : ""}
            {logo4? <a href={link4} target="_blank"><img src={logo4} alt="logo4"  /></a> : ""}
        </div>
        <div className="footer_right">
            <a href={linkShop} target="_blank">{nameShop}</a>
        </div>
    </div>
    )
};

export default Footer;
