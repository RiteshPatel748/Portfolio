import React, { useState, useEffect } from 'react';
import './default.css'; 
import './variables.css'; 
import './font-awesome.css'; 
import { getFirestore, collection, getDocs,addDoc,doc } from 'firebase/firestore/lite';
import { initializeApp} from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';

const Home = () => {

  const [theme, setTheme] = useState('blue');
  const [skills, setSkills] = useState([]);
  const [links, setLinks] = useState([]);
  const [project, setProject] = useState([]);
  const [info, setInfo] = useState({});
  const [certifications, setCertifications] = useState([]);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

// Get a list of skills from your database
async function getSkills(db) {
  const skillsCol = collection(db, 'Skills');
  const skillsSnapshot = await getDocs(skillsCol);
  const skillsList = skillsSnapshot.docs.map(doc => doc.data());
  setSkills(skillsList)
}
async function getProjects(db) {
  const projectsCol = collection(db, 'Projects');
  const projectsSnapshot = await getDocs(projectsCol);
  const projectsList = projectsSnapshot.docs.map(doc => doc.data());
  setProject(projectsList)
}
async function getInfo(db) {
  const infoCol = collection(db, 'Info');
  const infoSnapshot = await getDocs(infoCol);
  const infoList = infoSnapshot.docs.map(doc => doc.data());
  setInfo(...infoList)
}
async function getLinks(db) {
  const linksCol = collection(db, 'Links');
  const linksSnapshot = await getDocs(linksCol);
  const linksList = linksSnapshot.docs.map(doc => doc.data());
  setLinks(linksList)
}
async function getCertifications(db) {
  const CertificationsCol = collection(db, 'Certifications');
  const CertificationsSnapshot = await getDocs(CertificationsCol);
  const CertificationsList = CertificationsSnapshot.docs.map(doc => doc.data());
  setCertifications(CertificationsList)
}

useEffect(()=>{
  getSkills(db);
  getProjects(db);
  getInfo(db);
  getLinks(db);
  getCertifications(db);
  let data=localStorage.getItem('theme')
  handleThemeChange(data)
},[])

const handleSubmit = (event) => {
  event.preventDefault() 
  const mailtoLink = `mailto:${info?.Email}?subject=Contact from ${email}&body=Name :${name}, Subject :${subject}, Description:${description}`;
  console.log(mailtoLink)
  window.location.href = mailtoLink;
};

const handleThemeChange = (mode) => {
  setTheme(mode)
  if(mode == 'purple'){
		document.getElementById('theme-style').href = 'purple.css'
	}
	if(mode == 'light'){
		document.getElementById('theme-style').href = 'blue.css'
	}
	if(mode == 'blue'){
		document.getElementById('theme-style').href = 'default.css'
	}
	if(mode == 'green'){
		document.getElementById('theme-style').href = 'green.css'
	}
	localStorage.setItem('theme', mode)
  console.log(document.getElementById('theme-style').href)
  };

  return (
    <div>  
    <title>Ritesh Patel</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1" />
    <link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&family=Russo+One&display=swap" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="default.css" />
    <link id="theme-style" rel="stylesheet" type="text/css" href />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    
    {/* About*/} 
    <section className="s1">
      <div className="main-container">
        <div className="greeting-wrapper" style={{justifyContent:'center'}}>
          {(theme=='light')?<img src={info?.light_theme}/>:
          <img src={info?.dark_theme}/>}
        </div>
        <div className="intro-wrapper">
          <div className="nav-wrapper">
            {/* Link around dots-wrapper added after tutorial video */}
            <a href="index.html">
              <div className="dots-wrapper">
                <div id="dot-1" className="browser-dot" />
                <div id="dot-2" className="browser-dot" />
                <div id="dot-3" className="browser-dot" />
              </div>
            </a>
            <ul id="navigation">
              <li><a href="index.html#Education">Education</a></li>
            </ul>
            <ul id="navigation">
              <li><a href="index.html#skills">Skills</a></li>
            </ul>
            <ul id="navigation">
              <li><a href="index.html#certificates">Certificates</a></li>
            </ul>
            <ul id="navigation">
              <li><a href="index.html#projects">Projects</a></li>
            </ul>
            <ul id="navigation">
              <li><a href="index.html#contact">Contact</a></li>
            </ul>
          </div>
          <div className="left-column">
            <img id="profile_pic" src={info?.profile_image} />
            <br />
            <h5 style={{textAlign: 'center', lineHeight: 0}}>Personalize Theme</h5>
            <div id="theme-options-wrapper">
              <div data-mode="light" id="light-mode" className="theme-dot" onClick={() => handleThemeChange('light')}/>
              <div data-mode="blue" id="blue-mode" className="theme-dot" onClick={() => handleThemeChange('blue')}/>
              <div data-mode="green" id="green-mode" className="theme-dot" onClick={() => handleThemeChange('green')}/>
              <div data-mode="purple" id="purple-mode" className="theme-dot" onClick={() => handleThemeChange('purple')}/>
            </div>
            <p id="settings-note">*Theme settings will be saved for<br />your next vist</p>
          </div>
          <div className="right-column">
            <div id="preview-shadow">
              <div id="preview">
                <div id="corner-tl" className="corner" />
                <div id="corner-tr" className="corner" />
                <h3>What I Do</h3>
                <p>{info?.What_I_Do}</p>
                <div id="corner-br" className="corner" />
                <div id="corner-bl" className="corner" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    {/* Skills*/} 
    
    <section className="s2">
      <div className="main-container">
        <div className="about-wrapper">
          <div className="about-me">
            <h4>More about me</h4>
            <p>{info?.More_About_Me_Line1}</p>
            <p>{info?.More_About_Me_Line2}</p>
            <hr />
            <h4>TOP EXPERTISE</h4>
            <p>Software developer with primary focus on Problem Solving: <a target="_blank" href={info?.resume}>Preview Resume</a></p>
            <div className="row">
              <div className="col-12">
                <h3 className="text-uppercase pb-4 pb-sm-5 mb-3 mb-sm-0 text-left text-sm-center custom-title ft-wt-600">
                  <br/>
                  <br/>
                  My Skills
                  <a name="skills" />
                </h3>
              </div>
               {skills.map((data)=>{return(<div className="col-6 col-md-3 mb-3 mb-sm-5 h-30 w-30">
                  <img  className=" h-20 w-20" src={data.image}  width="50" height="50"/>
                <p className="text-center mt-1 mt-sm-2">
                  {data.name}
                </p>
              </div>)})}
            </div>
          </div>
          <div className="social-links">
            <img id="social_img" src={info?.linkedin_image}/>
            <br /><br />
            <h3>Find me at:</h3>
            <br />
            <div className="row">
              {links.map(data=>{return(<a className=" col-md-4 mb-0 mb-sm-5"  target="_blank" href={data?.url}>
                <img width={50} height={50} src={data?.image}/>
                <p>{data.name}</p>
              </a>)})}
            </div>
            <br />
            <br />
            <br />
            <br />
            <h3>Contact:</h3>
            <br />
            <a target="_blank" href="mailto:Ritesh3666@gmail.com">Email: {info?.Email}</a>
          </div>
        </div>
      </div>
    </section>
    {/* Education Starts */}  
     
    <section className="s1">
      <div className="main-container" style={{marginTop: '30px',}}>
        <div className="row">
            <a name="Education" />
            <div className="col-12">
            <h3 className="text-uppercase pb-5 mb-0 text-left text-sm-center custom-title ft-wt-600">
                Education <span>&amp;</span> Experience
            </h3>
            </div>
            <div className="col-lg-6 m-15px-tb margin-left">
            <div className="resume-box">
                <ul>
                <li>
                    <div className="icon">
                    <i className="fa fa-graduation-cap" />
                    </div>
                    <span className="time open-sans-font text-uppercase">2024</span>
                    <h5 className=" text-uppercase">
                    Masters of Computer Application ~ <span className="open-sans-font"><b style={{color: '#008080'}}>RGPV University</b></span>
                    </h5>
                    <p>
                    Pursuing Masters of Computer Application from Shri Ram Institute of Technology sepecializing in Computer Science to gain
                    knowledge of core subject like Java,DSA, DBMS, SQL etc.
                    <br />
                    <span className="time open-sans-font  ">Grade ~ 7.53/10 CGPA</span>
                    </p>
                </li>
                <li>
                    <div className="icon">
                    <i className="fa fa-graduation-cap" />
                    </div>
                    <span className="time open-sans-font text-uppercase">2022</span>
                    <h5 className="  text-uppercase">
                    Bachelor of Science ~
                    <span className="open-sans-font"><b style={{color: '#008080'}}>RDVV UNIVERSITY</b></span>
                    </h5>
                    <p>
                    Completed Bachelor of Science from Govt. Model Science College in Computer Science to gain knowledge
                    of core subject like C, C++ etc.
                    <br />
                    <span className="time open-sans-font  ">Grade ~ 74.55%</span>
                    </p>
                </li>
                </ul>
            </div>
            </div>
            <div className="col-lg-6 m-15px-tb">
            <div className="resume-box">
                <ul>
                <li>
                    <div className="icon">
                    <i className="fa fa-graduation-cap" />
                    </div>
                    <span className="time open-sans-font text-uppercase">2019</span>
                    <h5 className=" text-uppercase">
                    Higher Secondary School ~
                    <span className="open-sans-font"><b style={{color: '#008080'}}>Saraswati Higher Secondary School, Gotegaon</b></span>
                    </h5>
                    <p>
                    Mathematics, Chemistry and Physics
                    <br />
                    <span className="time open-sans-font  "><b style={{color: '#ffb400'}}> PCM </b>Grade ~ 84.6%</span>
                    </p>
                </li>
                <li>
                    <div className="icon">
                    <i className="fa fa-graduation-cap" />
                    </div>
                    <span className="time open-sans-font text-uppercase">2017</span>
                    <h5 className=" text-uppercase">
                    Secondary School ~
                    <span className=" open-sans-font"><b style={{color: '#008080'}}>Saraswati Higher Secondary School, Gotegaon</b></span>
                    </h5>
                    <p>
                    <br />
                    <span className="time open-sans-font  ">Grade ~ 89.3%</span>
                    </p>
                </li>
                </ul>
            </div>
            </div>
        </div>
      </div>
    </section>

    {/* Certifications*/}
    <section className="s2">
      <div className="main-container" style={{marginTop: '30px',justifyContent:'center',alignItems:'center'}}>
            <a name="certificates" />
            <div style={{textAlign:"left"}} >
                 <h3 className='text-uppercase text-sm-center ' style={{marginLeft: '30px', color: '#ffb400', paddingBottom: '20px'}}>
                    Certifications
                </h3>
                  {certifications.map(data=>{return(<p>● {data?.name} <a target="_blank" href={data?.url}>see</a><br /></p>)})}
                  
            </div>
        </div>
    </section>

    {/* Project */}
    <section className="s1">
      <a name="projects" />
      <div className="main-container">
        <h3 style={{textAlign: 'center', marginTop: '50px',marginBottom: '50px'}}>Some of my past projects</h3>
        <div className="post-wrapper">
          {project.map(data=>{return(<div >
            <div className="post" >
              <img className="thumbnail" style={{height:200}} src={data.image} />
              <div className="post-preview" >
                <h6 className="post-title" style={{textAlign:"left"}}>{data.title}</h6>
                <p className="post-intro" style={{textAlign:"initial",}}>{data.discription}</p>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  {data.viewlink&&<a target="_blank" href={data?.viewlink}>{(data?.true)?'View':'Download'}</a> }
                  <a target="_blank" href={data.repolink}>See Repo</a> 
                </div>
              </div>
            </div>
          </div>)})}
          <div>
            <div className="post">
              <img className="thumbnail" src={info?.comingsoon_image} />
              <div className="post-preview">
                <h6 className="post-title">{info?.comingsoon_title}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>   

    {/* Get In Touch*/}
    <section className="s2 row">
      <div className="main-container col-lg-6" style={{marginTop: '30px',}}>
        <h2 style={{textAlign: 'center'}}>Acheivements</h2>
        <br />
        <div className="post-wrapper">
          <div>
            <div className="post">
              <img className="thumbnail" src={info?.award_image} />
              <div className="post-preview">
                <h6 className="post-title">Award for Excellence</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-container col-lg-6" style={{marginTop: '30px',}}>
        <a href />
        <h3 style={{textAlign: 'center'}}>Get In Touch</h3>
        <form id="contact-form" onSubmit={handleSubmit} style={{textAlign:"left"}}>
          <a name="contact" />
          <label>Name</label>
          <input className="input-field" type="text" name="name" required 
              value={name}
              onChange={handleNameChange}/>
          <label>Subject</label>
          <input className="input-field" type="text" name="subject" required 
              value={subject}
              onChange={handleSubjectChange}/>
          <label>Email</label>
          <input className="input-field" type="text" name="email" required 
              value={email}
              onChange={handleEmailChange}/>
          <label>Message</label>
          <textarea className="input-field" name="message" required defaultValue={""} 
              value={description}
              onChange={handleDescriptionChange}/>
          <input id="submit-btn" type="submit" defaultValue="Send" />
        </form>
      </div>
    </section>
    </div>
  );
};

export default Home;
