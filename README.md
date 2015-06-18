<h1>Using XML to Populate Underscore Templates</h1> 
<p>XML is more readable than JSON</p>
<p><a href="http://jvmqueue.com/XmlForUnderscoreTemplate/">Live URL</a></p>
<h2>Current State</h2>
<p>In Development</p>
<p>Using, but not limited to:</p>
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
    <li>Custom JS libraries for code reusabiltiy</li>
    <li>OO JS to persist data and access private members</li>
    <li>Underscore JS for seperation of HTML templates from static markup</li>
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
            │   ├── scripts
            │   │   └── base
            │   │         └── bower_components
            │   │               └── backbone
            │   │               └── bootstrap
            │   │               └── jquery
            │   │               └── underscore            
            │   │         └── require-2.1.17.js
            │   │   └── config.js
            │   │   └── main.js
            │   │   └── regex.js
            │   │   └── template.js
            │   │   └── util.js
            │   │   └── xml.js
            │   │ 
            │   ├── styles
            │   │   └── main.css
            
        </code>
    </pre>
</div>


 

 

