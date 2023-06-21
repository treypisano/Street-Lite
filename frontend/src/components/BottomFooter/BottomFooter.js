import "./BottomFooter.css";

const BottomFooter = () => {
  return (
    <footer id="main-bottom-footer">
      <div className="bottom-footer">
        <ul className="bottom-footer-col">

          <h3 className='bottom-footer-title'>Trey Pisano</h3>
          <li><a href="https://github.com/treypisano">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/trey-pisano-1377a6227/">LinkedIn</a></li>
          <li><a href="https://wellfound.com/u/trey-pisano">Wellfound</a></li>

        </ul>
        <ul className="bottom-footer-col">
          <h3 className='bottom-footer-title'>Harjit Singh</h3>
          <li><a href="https://github.com/harjitsingh2">GitHub</a></li>
          <li><a href="https://www.linkedin.com/harjitsingh2">LinkedIn</a></li>
          <li><a href="https://wellfound.com/u/harjitsingh2">Wellfound</a></li>
        </ul>
        <ul className="bottom-footer-col">
          <h3 className="bottom-footer-title">Arvid Hossain</h3>
          <li>
            <a href="https://github.com/arvidh97">GitHub</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/arvid-hossain-71576017a/">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://wellfound.com/">Wellfound</a>
          </li>
        </ul>
        <ul className="bottom-footer-col">

          <h3 className='bottom-footer-title'>Mohammad Naqvi</h3>
          <li><a href="https://github.com/mxnaqvi">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/mohammadalinaqvi/">LinkedIn</a></li>
          <li><a href="https://wellfound.com/u/mohammad-naqvi-6">Wellfound</a></li>
        </ul>
        <ul className="bottom-footer-col">

          <h3 className='bottom-footer-title'>Technologies Used</h3>
            <li>MongoDB</li>
            <li>Express</li>
            <li>React/Node</li>
            <li>Google Maps API</li>
            <li>NYC Open Data API</li>
        </ul>
      </div>
    </footer>
  );
};

export default BottomFooter;
