import { Container, Filters, ProductsGroupList, Title, TopBar } from '@/components/shared';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="pb-14 mt-10">
        <div className="flex gap-[60px]">
          {/* filter */}
          <div className="w-[250px]">
            <Filters />
          </div>
          {/* Pizza cards */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Pizzas"
                items={[
                  {
                    id: '1',
                    name: 'Margherita',
                    imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
                    items: [{ price: 10.99 }],
                  },
                  {
                    id: '1',
                    name: 'Margherita',
                    imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
                    items: [{ price: 10.99 }],
                  },
                ]}
                categoryId={1}
              />
              <ProductsGroupList
                title="Soup"
                items={[
                  {
                    id: '1',
                    name: 'Margherita',
                    imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
                    items: [{ price: 10.99 }],
                  },
                  {
                    id: '1',
                    name: 'Margherita',
                    imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif',
                    items: [{ price: 10.99 }],
                  },
                ]}
                categoryId={2}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
