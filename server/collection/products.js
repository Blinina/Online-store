const {v4} = require('uuid')

// const exm = {
//     "id": v4(),
//     "title": "",
//     "price": ,
//     "description": "",
//     "category": "",
//     "type": "",
//     "image": ["", ""],
//     "rating": ,
//     "newColection": false,
//     "sales": {
//         "sales": false,
//         "count": 0,
//     }
// }
let PRODUCT = [
    {
        "id": v4(),
        "title": "NaaNaa draped mini dress in brown",
        "price": 7,
        "description": "Smooth woven fabric.\nLightweight feel.\nMain: 100% Polyester",
        "category": "women",
        "type": "dresses",
        "image": ["https://images.asos-media.com/products/naanaa-draped-mini-dress-in-brown/200917415-2?$n_480w$&wid=476&fit=constrain", "https://images.asos-media.com/products/naanaa-draped-mini-dress-in-brown/200917415-1-brown?$n_480w$&wid=476&fit=constrain" ],
        "rating": 4.2,
        "newColection": false,
        "sales": {
            "sales": false,
            "count": 0,
        }
    },
    {
        "id": v4(),
        "title": "Parisian halter neck cross front mini dress in black",
        "price": 30.3,
        "description": "Satin-style fabric: glossy and silky-smooth.\nMain: 95% Polyester, 5% Elastane.",
        "category": "women",
        "type": "dresses",
        "image": ["https://images.asos-media.com/products/topshop-premium-textured-floral-tie-front-mini-dress-in-black-black/200461214-1-black?$n_480w$&wid=476&fit=constrain ", "https://images.asos-media.com/products/topshop-premium-textured-floral-tie-front-mini-dress-in-black-black/200461214-2?$n_480w$&wid=476&fit=constrain"],
        "rating": 4.4,
        "newColection": false,
        "sales": {
            "sales": false,
            "count": 0,
        }
    },
    {
        "id": v4(),
        "title": "Aria Cove corset detail volume sleeve mini dress in slate blue",
        "price": 12,
        "description": "Plain-woven fabric\nFabric: 100% Polyester.",
        "category": "women",
        "type": "dresses",
        "image": [ "https://images.asos-media.com/products/aria-cove-corset-detail-volume-sleeve-mini-dress-in-slate-blue/201517448-2?$n_480w$&wid=476&fit=constrain" , "https://images.asos-media.com/products/aria-cove-corset-detail-volume-sleeve-mini-dress-in-slate-blue/201517448-1-slateblue?$n_480w$&wid=476&fit=constrain" ],
        "rating": 3.9,
        "newColection": true,
        "sales": {
            "sales": false,
            "count": 0,
        }
    },
    {
        "id": v4(),
        "title": " Curve soft all over embroidered maxi dress in khaki",
        "price": 37,
        "description": "Woven fabric\nSoft, floaty finish\nBody: 100% Polyester, Lining: 100% Polyester.",
        "category": "women",
        "type": "dresses",
        "image":["https://images.asos-media.com/products/asos-design-curve-soft-all-over-embroidered-maxi-dress-in-khaki/202305718-1-khaki?$n_480w$&wid=476&fit=constrain" , "https://images.asos-media.com/products/asos-design-curve-soft-all-over-embroidered-maxi-dress-in-khaki/202305718-2?$n_480w$&wid=476&fit=constrain"],
        "rating": 4.6,
        "newColection": false,
        "sales": {
            "sales": true,
            "count": 10,
        }
    }
];
module.exports.PRODUCT = PRODUCT;