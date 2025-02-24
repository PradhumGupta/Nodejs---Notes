import Note from "../models/Notes.js";
import mongoose from "mongoose";

/**
 * GET /
 * Dashboard
 */

const dashboard = async (req, res, next) => { 
    let perPage = 8;
    let page = req.query.page || 1;

    const locals = { 
        title: "Dashboard", 
        description: "Free NodeJs Notes App"
    }

    try {
        const notes = await Note.aggregate([
            {
                $sort: { createdAt: -1 }
            },
            {
                $match: { user: new mongoose.Types.ObjectId(req.user.id) }
            },
            {
                $project: { 
                    title: { $substrCP: [ "$title", 0, 30 ] },
                    body: { $substrCP: [ "$body", 0, 100 ] }
                }
            }
        ])
        .skip(perPage * page - perPage)
        .limit(perPage);

        const count = await Note.countDocuments({ user: req.user.id});
        
        res.render('dashboard/index', {
            userName: req.user.firstName,
            locals,
            notes,
            layout: '../views/layouts/dashboard',
            current: page,
            pages: Math.ceil(count / perPage)
        });
        
    } catch (error) {
        console.error(error);
        next(error);
    }
};

/**
 * GET /
 * View Note
 */

const dashboardViewNote = async (req, res) => {
    const note = await Note.findById({ _id: req.params.id })
    .where({ user: req.user.id }).lean();

    if(note) {
        res.render('dashboard/view-note', {
            noteID: req.params.id,
            note,
            layout: '../views/layouts/dashboard'
        });
    } else {
        res.send("Something went wrong");
    }
}

/**
 * PUT /
 * Update Note
 */

const dashboardUpdateNote = async (req, res) => {
    try {
        await Note.findOneAndUpdate(
            { _id: req.params.id },
            { title: req.body.title, body: req.body.body }
        ).where( { user: req.user.id } );
        res.redirect('/dashboard');
    
    } catch (error) {
        console.error(error);
    }
}

/**
 * DELETE /
 * Delete Note
 */

const dashboardDeleteNote = async (req, res) => {
    try {
        await Note.deleteOne({ _id: req.params.id }).where({ user: req.user.id });
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
    }
}

/**
 * GET /
 * Add Note
 */

const dashboardAddNote = async (req, res) => {
    res.render('dashboard/add', {
        layout: '../views/layouts/dashboard'
    });
};

/**
 * POST /
 * Add Note
 */

const dashboardAddNoteSubmit = async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Note.create(req.body);
        res.redirect('/dashboard');
    } catch(error) {
        console.error(error);
    }
}

/**
 * GET /
 * Search
 */

const dashboardSearch = async (req, res) => {
    try {
        res.render('dashboard/search', {
            searchResults: '',
            layout: '../views/layouts/dashboard'
        });
    } catch (error) {
        console.error(error);
    }
}

/**
 * POST /
 * Search For Notes
 */

const dashboardSearchSubmit = async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9]/g, '');

        const searchResults = await Note.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChars, 'i') }},
                { body: { $regex: new RegExp(searchNoSpecialChars, 'i') }}
            ]
        }).where( { user: req.user.id } );

        res.render('dashboard/search', {
            searchResults,
            layout: '../views/layouts/dashboard'
        })
    } catch (error) {
        console.error(error);
    }
}

export { dashboard, dashboardViewNote, dashboardUpdateNote, dashboardDeleteNote, dashboardAddNote, dashboardAddNoteSubmit, dashboardSearch, dashboardSearchSubmit };