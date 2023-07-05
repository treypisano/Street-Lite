import React from 'react';
import './BottomFooter.css';
import githubLogo from './github-mark.png';
import linkedinLogo from './LI-In-Bug.png';
import wellfoundLogo from './wellfound-symbol-black.png';

const BottomFooter = () => {
  return (
    <footer id="main-bottom-footer">
      <div className="bottom-footer">
        <div className="bottom-footer-col">
          <h3 className="bottom-footer-title">Trey Pisano</h3>
          <ul className="logo-list">
            <li>
              <a href="https://github.com/treypisano">
                <img src={githubLogo} alt="GitHub" className="logo" />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/trey-pisano-1377a6227/">
                <img src={linkedinLogo} alt="LinkedIn" className="logo" />
              </a>
            </li>
            <li>
              <a href="https://wellfound.com/u/trey-pisano">
                <img src={wellfoundLogo} alt="Wellfound" className="logo" />
              </a>
            </li>
          </ul>
        </div>
        <div className="bottom-footer-col">
          <h3 className="bottom-footer-title">Harjit Singh</h3>
          <ul className="logo-list">
            <li>
              <a href="https://github.com/harjitsingh2">
                <img src={githubLogo} alt="GitHub" className="logo" />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/harjitsingh2/">
                <img src={linkedinLogo} alt="LinkedIn" className="logo" />
              </a>
            </li>
            <li>
              <a href="https://wellfound.com/u/harjitsingh2">
                <img src={wellfoundLogo} alt="Wellfound" className="logo" />
              </a>
            </li>
          </ul>
        </div>
        <div className="bottom-footer-col">
          <h3 className="bottom-footer-title">Arvid Hossain</h3>
          <ul className="logo-list">
            <li>
              <a href="https://github.com/arvidh97">
                <img src={githubLogo} alt="GitHub" className="logo" />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/arvid-hossain-71576017a/">
                <img src={linkedinLogo} alt="LinkedIn" className="logo" />
              </a>
            </li>
            <li>
              <a href="https://wellfound.com/">
                <img src={wellfoundLogo} alt="Wellfound" className="logo" />
              </a>
            </li>
          </ul>
        </div>
        <div className="bottom-footer-col">
          <h3 className="bottom-footer-title">Mohammad Naqvi</h3>
          <ul className="logo-list">
            <li>
              <a href="https://github.com/mxnaqvi">
                <img src={githubLogo} alt="GitHub" className="logo" />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/mohammadalinaqvi/">
                <img src={linkedinLogo} alt="LinkedIn" className="logo" />
              </a>
            </li>
            <li>
              <a href="https://wellfound.com/u/mohammad-naqvi-6">
                <img src={wellfoundLogo} alt="Wellfound" className="logo" />
              </a>
            </li>
          </ul>
        </div>
        <div className="bottom-footer-col">
          <h3 className="bottom-footer-title">Technologies Used</h3>
          <ul>
            <li>MongoDB</li>
            <li>Express</li>
            <li>React/Node</li>
            <li>Google Maps API</li>
            <li>NYC Open Data API</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default BottomFooter;
