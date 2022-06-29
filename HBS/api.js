class Api {

    constructor(products){
        this.products = products;
    }

    getAll(req, res){
        res.json({products: this.products});
    }

    getProdId(req, res){
        const oneProduct = this.products.find(prod => prod.id === Number(req.params.id));
        
        if(oneProduct){
            res.json({oneProduct})
        }else{
            res.status(404).json({error: "Not Found"});
        }
    }

    postProd(req, res){
        const newProduct = req.body;
        if(newProduct.title && newProduct.price && newProduct.thumbnail && Object.keys(newProduct).length === 3){
            const longitud = this.products.length;
            longitud ? newProduct.id = this.products[longitud - 1].id + 1 : newProduct.id = 1 ;
            this.products.push(newProduct);
            res.json(this.products);
        } else {
            return res.status(400).send({ error: "Not found" });
        }
    }


    putProd(req, res){
        const changeProd = req.body;

        const product = changeProd.title && changeProd.price && changeProd.thumbnail && 
        Object.keys(changeProd).length === 3 ? true : null;

        const prodId = this.products.findIndex(elem => elem.id === Number(req.params.id))
        const prodFind = this.products.find(elem => elem.id === Number(req.params.id));

        if (product && prodFind) {
            changeProd.id = this.products[prodId].id;
            this.products[prodId] = changeProd;
            return res.send("Product modified");
        } 
    
        if (!prodFind) {
            return res.status(404).send({error: "Product not found"})
        }

        if (!product) {
            res.send({error: "Something go wrong, please try again"})
        }
    }

    deleteProd(req, res){
        const prodId = this.products.findIndex(elem => elem.id === Number(req.params.id))

        if(prodId < 0){
            return res.status(404).send({error: "Product not found"});
        }else{
            this.products.splice(prodId, 1);
            res.send("Product deleted")
        }
    }
};

module.exports = Api;