<p><a href="http://jvmqueue.com/XmlForUnderscoreTemplate/">Live URL</a></p>
<h1>Using XML to Populate Underscore Templates</h1> 
<h2>Motivation</h2>
<ul>
    <li>XML is more readable than JSON</li>
</ul>
<h2>Current State</h2>
<p>In Development</p>
<h2>Using, but not limited to:</h2>
<ul>
    <li>Primitive JavaScript</li>
    <li>Object oriented JavaScript</li>
    <li>jQuery</li>
    <li>Require.js</li>
    <li>Underscore.js</li>
    <li>Bootstrap</li>   
    <li>CSS3</li>   
    <li>Grunt</li>
</ul>
<h3>Stategies and Techniques</h3>
<ul>
    <li>Require JS for AMD patterns</li>
    <li>Config.js for loading dependencies. HTML has a single script tag.</li>
    <li>Custom JS libraries for code reusabiltiy</li>
    <li>OO JS to persist data and access private members</li>
    <li>Underscore JS for separation of HTML templates from static markup</li>
    <li>XML for server side data</li>
    <li>Custom event listeners to avoid using setIntervals</li>
    <li>Bootstrap for responsive design</li>
</ul>
</ul>
<h4>Fundemental Architecture</h4>
<div>
    <pre>
        <code>
            ├── site
            │   ├── Gruntfile.js
            │   ├── index.html
            │   ├── package.json
            │   ├── README.md
            │   ├── data
            │   │   └── buttons.xml
            │   │   └── education.xml
            │   ├── templates
            │   │   └── buttons.html
            │   │   └── home.html
            │   │   └── resume.html                        
            │   ├── scripts
            │   │   └── config.js
            │   │   └── main.js
            │   │   └── regex.js
            │   │   └── template.js
            │   │   └── util.js
            │   │   └── xml.js            
            │   │   └── base
            │   │         └── require-2.1.17.js            
            │   │         └── bower_components
            │   │               └── backbone
            │   │               └── bootstrap
            │   │               └── jquery
            │   │               └── underscore            
            │   │ 
            │   ├── styles
            │   │   └── main.css
            
        </code>
    </pre>
</div>


 

 

