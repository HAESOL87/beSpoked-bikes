import { Product, Customer, Salesperson, Sale, Discount, SaleWithDetails, DiscountWithDetails } from '../types';

export const products: Product[] = [
    {
        id: 1,
        name: "The Big Boys",
        manufacturer: "Big Boy Bikes",
        style: "Mountain",
        purchasePrice: 500,
        salePrice: 1000,
        qtyOnHand: 8,
        commissionPercentage: 11.06
    },
    {
        id: 2,
        name: "Jumpers",
        manufacturer: "Trickster Bikes",
        style: "Trick",
        purchasePrice: 800,
        salePrice: 2201,
        qtyOnHand: 8,
        commissionPercentage: 2
    },
    {
        id: 3,
        name: "Balance Bike",
        manufacturer: "Hasbro",
        style: "Toddler",
        purchasePrice: 25,
        salePrice: 125,
        qtyOnHand: 50,
        commissionPercentage: 10
    },
    {
        id: 4,
        name: "Tricycles",
        manufacturer: "Toycycles",
        style: "Toddler",
        purchasePrice: 35,
        salePrice: 135,
        qtyOnHand: 5,
        commissionPercentage: 10
    }
];

export const customers: Customer[] = [
    {
        id: 1,
        firstName: "Johnyy",
        lastName: "Doe",
        address: "789 Pine Sts5",
        phone: "555-3333",
        startDate: "2023-03-10T00:00:00"
    },
    {
        id: 3,
        firstName: "Clark",
        lastName: "Kent",
        address: "2607 Hawthorne Pl NE",
        phone: "229-300-9697",
        startDate: "2025-05-19T00:00:00"
    },
    {
        id: 6,
        firstName: "Lois",
        lastName: "Lane",
        address: "223 Metropolis Ave, Atlanta, GA 30333",
        phone: "221-229-3045",
        startDate: "2025-05-05T00:00:00"
    },
    {
        id: 11,
        firstName: "Mark",
        lastName: "Cantrell",
        address: "4060 Shelby Lane",
        phone: "6789234761",
        startDate: "2025-06-30T00:00:00"
    }
];

export const salespersons: Salesperson[] = [
    {
        id: 1,
        firstName: "Stanley",
        lastName: "Lee",
        address: "8854 Pine View Drive",
        phone: "404-897-5544",
        startDate: "2025-06-04T00:00:00",
        terminationDate: "2025-06-06T00:00:00",
        manager: "Jonathan Reed"
    },
    {
        id: 2,
        firstName: "Clark",
        lastName: "Waite",
        address: "2607 Hawthorne PL NE",
        phone: "229-300-9699",
        startDate: "2025-06-17T00:00:00",
        terminationDate: "2025-06-27T00:00:00",
        manager: "Sawyer Waite"
    },
    {
        id: 6,
        firstName: "Henry",
        lastName: "Ford",
        address: "68 Mustang Drive",
        phone: "123-345-5678",
        startDate: "2025-05-19T00:00:00",
        terminationDate: "2025-05-20T00:00:00",
        manager: "Clara Bryant Ford"
    },
    {
        id: 12,
        firstName: "Johny",
        lastName: "Doess",
        address: "2607 Hawthorne PL NE",
        phone: "333-4444-6666",
        startDate: "2025-06-29T00:00:00",
        terminationDate: "2025-06-26T00:00:00",
        manager: "Sawyer Waite"
    },
    {
        id: 14,
        firstName: "Clark",
        lastName: "Doe",
        address: "2607 Hawthorne PL NE",
        phone: "555-555-5555",
        startDate: "2025-06-05T00:00:00",
        terminationDate: "2025-07-07T00:00:00",
        manager: "Sawyer Wait"
    }
];

export const sales: SaleWithDetails[] = [
    {
        id: 6,
        productId: 1,
        salesPersonId: 2,
        customerId: 1,
        date: "2025-05-19T00:00:00",
        product: {
            id: 1,
            name: "The Big Boys",
            manufacturer: "Big Boy Bikes",
            style: "Mountain",
            purchasePrice: 500,
            salePrice: 1000,
            qtyOnHand: 8,
            commissionPercentage: 11.06
        },
        salesPerson: {
            id: 2,
            firstName: "Clark",
            lastName: "Waite",
            address: "2607 Hawthorne PL NE",
            phone: "229-300-9699",
            startDate: "2025-06-17T00:00:00",
            terminationDate: "2025-06-27T00:00:00",
            manager: "Sawyer Waite"
        },
        customer: {
            id: 1,
            firstName: "Johnyy",
            lastName: "Doe",
            address: "789 Pine Sts5",
            phone: "555-3333",
            startDate: "2023-03-10T00:00:00"
        }
    },
    {
        id: 7,
        productId: 2,
        salesPersonId: 1,
        customerId: 3,
        date: "2025-05-19T00:00:00",
        product: {
            id: 2,
            name: "Jumpers",
            manufacturer: "Trickster Bikes",
            style: "Trick",
            purchasePrice: 800,
            salePrice: 2201,
            qtyOnHand: 8,
            commissionPercentage: 2
        },
        salesPerson: {
            id: 1,
            firstName: "Stanley",
            lastName: "Lee",
            address: "8854 Pine View Drive",
            phone: "404-897-5544",
            startDate: "2025-06-04T00:00:00",
            terminationDate: "2025-06-06T00:00:00",
            manager: "Jonathan Reed"
        },
        customer: {
            id: 3,
            firstName: "Clark",
            lastName: "Kent",
            address: "2607 Hawthorne Pl NE",
            phone: "229-300-9697",
            startDate: "2025-05-19T00:00:00"
        }
    },
    {
        id: 13,
        productId: 2,
        salesPersonId: 6,
        customerId: 1,
        date: "2025-05-22T00:00:00",
        product: {
            id: 2,
            name: "Jumpers",
            manufacturer: "Trickster Bikes",
            style: "Trick",
            purchasePrice: 800,
            salePrice: 2201,
            qtyOnHand: 8,
            commissionPercentage: 2
        },
        salesPerson: {
            id: 6,
            firstName: "Henry",
            lastName: "Ford",
            address: "68 Mustang Drive",
            phone: "123-345-5678",
            startDate: "2025-05-19T00:00:00",
            terminationDate: "2025-05-20T00:00:00",
            manager: "Clara Bryant Ford"
        },
        customer: {
            id: 1,
            firstName: "Johnyy",
            lastName: "Doe",
            address: "789 Pine Sts5",
            phone: "555-3333",
            startDate: "2023-03-10T00:00:00"
        }
    },
    {
        id: 29,
        productId: 2,
        salesPersonId: 2,
        customerId: 3,
        date: "2025-06-24T00:00:00",
        product: {
            id: 2,
            name: "Jumpers",
            manufacturer: "Trickster Bikes",
            style: "Trick",
            purchasePrice: 800,
            salePrice: 2201,
            qtyOnHand: 8,
            commissionPercentage: 2
        },
        salesPerson: {
            id: 2,
            firstName: "Clark",
            lastName: "Waite",
            address: "2607 Hawthorne PL NE",
            phone: "229-300-9699",
            startDate: "2025-06-17T00:00:00",
            terminationDate: "2025-06-27T00:00:00",
            manager: "Sawyer Waite"
        },
        customer: {
            id: 3,
            firstName: "Clark",
            lastName: "Kent",
            address: "2607 Hawthorne Pl NE",
            phone: "229-300-9697",
            startDate: "2025-05-19T00:00:00"
        }
    },
    {
        id: 30,
        productId: 1,
        salesPersonId: 6,
        customerId: 6,
        date: "2025-06-04T00:00:00",
        product: {
            id: 1,
            name: "The Big Boys",
            manufacturer: "Big Boy Bikes",
            style: "Mountain",
            purchasePrice: 500,
            salePrice: 1000,
            qtyOnHand: 8,
            commissionPercentage: 11.06
        },
        salesPerson: {
            id: 6,
            firstName: "Henry",
            lastName: "Ford",
            address: "68 Mustang Drive",
            phone: "123-345-5678",
            startDate: "2025-05-19T00:00:00",
            terminationDate: "2025-05-20T00:00:00",
            manager: "Clara Bryant Ford"
        },
        customer: {
            id: 6,
            firstName: "Lois",
            lastName: "Lane",
            address: "223 Metropolis Ave, Atlanta, GA 30333",
            phone: "221-229-3045",
            startDate: "2025-05-05T00:00:00"
        }
    },
    {
        id: 32,
        productId: 3,
        salesPersonId: 1,
        customerId: 3,
        date: "2025-06-02T00:00:00",
        product: {
            id: 3,
            name: "Balance Bike",
            manufacturer: "Hasbro",
            style: "Toddler",
            purchasePrice: 25,
            salePrice: 125,
            qtyOnHand: 50,
            commissionPercentage: 10
        },
        salesPerson: {
            id: 1,
            firstName: "Stanley",
            lastName: "Lee",
            address: "8854 Pine View Drive",
            phone: "404-897-5544",
            startDate: "2025-06-04T00:00:00",
            terminationDate: "2025-06-06T00:00:00",
            manager: "Jonathan Reed"
        },
        customer: {
            id: 3,
            firstName: "Clark",
            lastName: "Kent",
            address: "2607 Hawthorne Pl NE",
            phone: "229-300-9697",
            startDate: "2025-05-19T00:00:00"
        }
    },
    {
        id: 33,
        productId: 4,
        salesPersonId: 6,
        customerId: 1,
        date: "2025-06-24T00:00:00",
        product: {
            id: 4,
            name: "Tricycles",
            manufacturer: "Toycycles",
            style: "Toddler",
            purchasePrice: 35,
            salePrice: 135,
            qtyOnHand: 5,
            commissionPercentage: 10
        },
        salesPerson: {
            id: 6,
            firstName: "Henry",
            lastName: "Ford",
            address: "68 Mustang Drive",
            phone: "123-345-5678",
            startDate: "2025-05-19T00:00:00",
            terminationDate: "2025-05-20T00:00:00",
            manager: "Clara Bryant Ford"
        },
        customer: {
            id: 1,
            firstName: "Johnyy",
            lastName: "Doe",
            address: "789 Pine Sts5",
            phone: "555-3333",
            startDate: "2023-03-10T00:00:00"
        }
    },
    {
        id: 37,
        productId: 1,
        salesPersonId: 1,
        customerId: 1,
        date: "2025-06-19T00:00:00",
        product: {
            id: 1,
            name: "The Big Boys",
            manufacturer: "Big Boy Bikes",
            style: "Mountain",
            purchasePrice: 500,
            salePrice: 1000,
            qtyOnHand: 8,
            commissionPercentage: 11.06
        },
        salesPerson: {
            id: 1,
            firstName: "Stanley",
            lastName: "Lee",
            address: "8854 Pine View Drive",
            phone: "404-897-5544",
            startDate: "2025-06-04T00:00:00",
            terminationDate: "2025-06-06T00:00:00",
            manager: "Jonathan Reed"
        },
        customer: {
            id: 1,
            firstName: "Johnyy",
            lastName: "Doe",
            address: "789 Pine Sts5",
            phone: "555-3333",
            startDate: "2023-03-10T00:00:00"
        }
    },
    {
        id: 38,
        productId: 1,
        salesPersonId: 1,
        customerId: 1,
        date: "2025-06-19T00:00:00",
        product: {
            id: 1,
            name: "The Big Boys",
            manufacturer: "Big Boy Bikes",
            style: "Mountain",
            purchasePrice: 500,
            salePrice: 1000,
            qtyOnHand: 8,
            commissionPercentage: 11.06
        },
        salesPerson: {
            id: 1,
            firstName: "Stanley",
            lastName: "Lee",
            address: "8854 Pine View Drive",
            phone: "404-897-5544",
            startDate: "2025-06-04T00:00:00",
            terminationDate: "2025-06-06T00:00:00",
            manager: "Jonathan Reed"
        },
        customer: {
            id: 1,
            firstName: "Johnyy",
            lastName: "Doe",
            address: "789 Pine Sts5",
            phone: "555-3333",
            startDate: "2023-03-10T00:00:00"
        }
    },
    {
        id: 39,
        productId: 1,
        salesPersonId: 1,
        customerId: 1,
        date: "2025-06-19T00:00:00",
        product: {
            id: 1,
            name: "The Big Boys",
            manufacturer: "Big Boy Bikes",
            style: "Mountain",
            purchasePrice: 500,
            salePrice: 1000,
            qtyOnHand: 8,
            commissionPercentage: 11.06
        },
        salesPerson: {
            id: 1,
            firstName: "Stanley",
            lastName: "Lee",
            address: "8854 Pine View Drive",
            phone: "404-897-5544",
            startDate: "2025-06-04T00:00:00",
            terminationDate: "2025-06-06T00:00:00",
            manager: "Jonathan Reed"
        },
        customer: {
            id: 1,
            firstName: "Johnyy",
            lastName: "Doe",
            address: "789 Pine Sts5",
            phone: "555-3333",
            startDate: "2023-03-10T00:00:00"
        }
    },
    {
        id: 40,
        productId: 1,
        salesPersonId: 1,
        customerId: 1,
        date: "2025-06-19T00:00:00",
        product: {
            id: 1,
            name: "The Big Boys",
            manufacturer: "Big Boy Bikes",
            style: "Mountain",
            purchasePrice: 500,
            salePrice: 1000,
            qtyOnHand: 8,
            commissionPercentage: 11.06
        },
        salesPerson: {
            id: 1,
            firstName: "Stanley",
            lastName: "Lee",
            address: "8854 Pine View Drive",
            phone: "404-897-5544",
            startDate: "2025-06-04T00:00:00",
            terminationDate: "2025-06-06T00:00:00",
            manager: "Jonathan Reed"
        },
        customer: {
            id: 1,
            firstName: "Johnyy",
            lastName: "Doe",
            address: "789 Pine Sts5",
            phone: "555-3333",
            startDate: "2023-03-10T00:00:00"
        }
    },
    {
        id: 41,
        productId: 1,
        salesPersonId: 1,
        customerId: 1,
        date: "2025-06-19T00:00:00",
        product: {
            id: 1,
            name: "The Big Boys",
            manufacturer: "Big Boy Bikes",
            style: "Mountain",
            purchasePrice: 500,
            salePrice: 1000,
            qtyOnHand: 8,
            commissionPercentage: 11.06
        },
        salesPerson: {
            id: 1,
            firstName: "Stanley",
            lastName: "Lee",
            address: "8854 Pine View Drive",
            phone: "404-897-5544",
            startDate: "2025-06-04T00:00:00",
            terminationDate: "2025-06-06T00:00:00",
            manager: "Jonathan Reed"
        },
        customer: {
            id: 1,
            firstName: "Johnyy",
            lastName: "Doe",
            address: "789 Pine Sts5",
            phone: "555-3333",
            startDate: "2023-03-10T00:00:00"
        }
    },
    {
        id: 42,
        productId: 2,
        salesPersonId: 6,
        customerId: 6,
        date: "2025-06-24T00:00:00",
        product: {
            id: 2,
            name: "Jumpers",
            manufacturer: "Trickster Bikes",
            style: "Trick",
            purchasePrice: 800,
            salePrice: 2201,
            qtyOnHand: 8,
            commissionPercentage: 2
        },
        salesPerson: {
            id: 6,
            firstName: "Henry",
            lastName: "Ford",
            address: "68 Mustang Drive",
            phone: "123-345-5678",
            startDate: "2025-05-19T00:00:00",
            terminationDate: "2025-05-20T00:00:00",
            manager: "Clara Bryant Ford"
        },
        customer: {
            id: 6,
            firstName: "Lois",
            lastName: "Lane",
            address: "223 Metropolis Ave, Atlanta, GA 30333",
            phone: "221-229-3045",
            startDate: "2025-05-05T00:00:00"
        }
    },
    {
        id: 43,
        productId: 2,
        salesPersonId: 12,
        customerId: 6,
        date: "2025-06-25T00:00:00",
        product: {
            id: 2,
            name: "Jumpers",
            manufacturer: "Trickster Bikes",
            style: "Trick",
            purchasePrice: 800,
            salePrice: 2201,
            qtyOnHand: 8,
            commissionPercentage: 2
        },
        salesPerson: {
            id: 12,
            firstName: "Johny",
            lastName: "Doess",
            address: "2607 Hawthorne PL NE",
            phone: "333-4444-6666",
            startDate: "2025-06-29T00:00:00",
            terminationDate: "2025-06-26T00:00:00",
            manager: "Sawyer Waite"
        },
        customer: {
            id: 6,
            firstName: "Lois",
            lastName: "Lane",
            address: "223 Metropolis Ave, Atlanta, GA 30333",
            phone: "221-229-3045",
            startDate: "2025-05-05T00:00:00"
        }
    }
];

export const discounts: DiscountWithDetails[] = [
    {
        id: 2,
        productId: 3,
        beginDate: "0001-01-01T00:00:00",
        endDate: "2025-06-19T00:00:00",
        percentage: 12,
        product: {
            id: 3,
            name: "Balance Bike",
            manufacturer: "Hasbro",
            style: "Toddler",
            purchasePrice: 25,
            salePrice: 125,
            qtyOnHand: 50,
            commissionPercentage: 10
        }
    },
    {
        id: 9,
        productId: 2,
        beginDate: "2025-06-01T00:00:00",
        endDate: "2025-06-27T00:00:00",
        percentage: 20,
        product: {
            id: 2,
            name: "Jumpers",
            manufacturer: "Trickster Bikes",
            style: "Trick",
            purchasePrice: 800,
            salePrice: 2201,
            qtyOnHand: 8,
            commissionPercentage: 2
        }
    },
    {
        id: 10,
        productId: 3,
        beginDate: "2025-06-01T00:00:00",
        endDate: "2025-06-30T00:00:00",
        percentage: 20,
        product: {
            id: 3,
            name: "Balance Bike",
            manufacturer: "Hasbro",
            style: "Toddler",
            purchasePrice: 25,
            salePrice: 125,
            qtyOnHand: 50,
            commissionPercentage: 10
        }
    },
    {
        id: 11,
        productId: 4,
        beginDate: "2025-06-01T00:00:00",
        endDate: "2025-06-30T00:00:00",
        percentage: 30,
        product: {
            id: 4,
            name: "Tricycles",
            manufacturer: "Toycycles",
            style: "Toddler",
            purchasePrice: 35,
            salePrice: 135,
            qtyOnHand: 5,
            commissionPercentage: 10
        }
    },
    {
        id: 12,
        productId: 2,
        beginDate: "2025-06-01T00:00:00",
        endDate: "2025-06-30T00:00:00",
        percentage: 40,
        product: {
            id: 2,
            name: "Jumpers",
            manufacturer: "Trickster Bikes",
            style: "Trick",
            purchasePrice: 800,
            salePrice: 2201,
            qtyOnHand: 8,
            commissionPercentage: 2
        }
    },
    {
        id: 13,
        productId: 1,
        beginDate: "2025-05-12T00:00:00",
        endDate: "2025-06-30T00:00:00",
        percentage: 40,
        product: {
            id: 1,
            name: "The Big Boys",
            manufacturer: "Big Boy Bikes",
            style: "Mountain",
            purchasePrice: 500,
            salePrice: 1000,
            qtyOnHand: 8,
            commissionPercentage: 11.06
        }
    }
]; 