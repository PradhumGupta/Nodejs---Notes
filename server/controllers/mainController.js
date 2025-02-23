/**
 * GET /
 * Homepage
 */

const homepage = async (req, res) => {
    const locals = { 
        title: "NodeJs Notes", 
        description: "Free NodeJs Notes App"
    }
    res.render('index', {
        locals,
        layout: '../views/layouts/front-page'
    });
};

/**
 * GET /
 * About
 */

const about = async (req, res) => {
    const locals = { 
        title: "About - NodeJs Notes", 
        description: "Free NodeJs Notes App"
    }
    res.render('about', locals);
};

export { homepage, about };