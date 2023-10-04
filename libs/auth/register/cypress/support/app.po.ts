export const getGreeting = () => cy.get('h1');
export function generateEmailAddress (baseEmail: string): string {
    const uniqueId: number = Math.random();

    return baseEmail.replace('@', `${uniqueId}@`)
}
