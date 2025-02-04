import { Container, Filters, ProductsGroupList, Title, TopBar } from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';

export default async function Home() {
  const category = await prisma.category.findMany({
    include: {
      products: {
        include: {
          items: true,
          ingredients: true,
        },
      },
    },
  });
  return (
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="lg" className="font-extrabold" />
      </Container>
      <TopBar categories={category.filter((cat) => cat.products.length > 0)}/>
      <Container className="pb-14 mt-10">
        <div className="flex gap-[60px]">
          {/* filter */}
          <div className="w-[250px]">
            <Filters />
          </div>
          {/* Pizza cards */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {category.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList key={category.id} title={category.name} categoryId={category.id} items={category.products} />
                  ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
